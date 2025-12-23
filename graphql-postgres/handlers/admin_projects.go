package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func AdminProjectsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, _ := db.Query(`
			SELECT id, city, district, province, address,
			       size_sqm, latitude, longitude, status
			FROM admin_projects
		`)
		defer rows.Close()

		type Project struct {
			ID        int     `json:"id"`
			City      string  `json:"city"`
			District  string  `json:"district"`
			Province  string  `json:"province"`
			Address   string  `json:"address"`
			SizeSqm   float64 `json:"size_sqm"`
			Latitude  float64 `json:"latitude"`
			Longitude float64 `json:"longitude"`
			Status    string  `json:"status"`
		}

		var projects []Project
		for rows.Next() {
			var p Project
			rows.Scan(&p.ID, &p.City, &p.District, &p.Province, &p.Address,
				&p.SizeSqm, &p.Latitude, &p.Longitude, &p.Status)
			projects = append(projects, p)
		}

		json.NewEncoder(w).Encode(projects)
	}
}
