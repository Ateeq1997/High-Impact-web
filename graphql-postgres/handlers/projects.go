package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func ProjectsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT id, region, city, district, address, size_sqm, latitude, longitude
			FROM user_project
		`)
		if err != nil {
			http.Error(w, "Failed to fetch projects", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Project struct {
			ID       int     `json:"id"`
			Name     string  `json:"name"`
			Location string  `json:"location"`
			Size     int     `json:"size"`
			Lat      float64 `json:"lat"`
			Lng      float64 `json:"lng"`
			Status   string  `json:"status"`
		}

		var projects []Project

		for rows.Next() {
			var p Project
			var region, city, district, address string

			err := rows.Scan(
				&p.ID,
				&region,
				&city,
				&district,
				&address,
				&p.Size,
				&p.Lat,
				&p.Lng,
			)
			if err != nil {
				continue
			}

			p.Name = district + " Project"
			p.Location = city + ", " + region
			p.Status = "opportunities" // ✅ default status for the board

			projects = append(projects, p)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(projects)
	}
}
