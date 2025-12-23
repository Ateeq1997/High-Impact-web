package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func DistrictsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, _ := db.Query(`
			SELECT id, district_name, division_name,
			       province_name, centroid_lat,
			       centroid_long, ST_AsGeoJSON(boundary_polygon)
			FROM pak_administrative_boundaries
		`)
		defer rows.Close()

		var features []map[string]interface{}

		for rows.Next() {
			var id int
			var d, div, p string
			var lat, lng float64
			var geo string

			rows.Scan(&id, &d, &div, &p, &lat, &lng, &geo)

			features = append(features, map[string]interface{}{
				"type":     "Feature",
				"geometry": json.RawMessage(geo),
				"properties": map[string]interface{}{
					"id": id, "district": d, "division": div, "province": p,
				},
			})
		}

		json.NewEncoder(w).Encode(map[string]interface{}{
			"type":     "FeatureCollection",
			"features": features,
		})
	}
}
