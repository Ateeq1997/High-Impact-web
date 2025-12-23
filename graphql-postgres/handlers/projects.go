package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func ProjectsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, _ := db.Query(`
			SELECT region, city, district,
			       address, size_sqm,
			       latitude, longitude
			FROM user_project
		`)
		defer rows.Close()

		type Project struct {
			Name     string  `json:"name"`
			Location string  `json:"location"`
			Size     int     `json:"size"`
			Lat      float64 `json:"lat"`
			Lng      float64 `json:"lng"`
		}

		var projects []Project
		for rows.Next() {
			var p Project
			var region, city, district, addr string

			rows.Scan(&region, &city, &district, &addr, &p.Size, &p.Lat, &p.Lng)

			p.Name = district + " Project"
			p.Location = city + ", " + region

			projects = append(projects, p)
		}

		json.NewEncoder(w).Encode(projects)
	}
}
