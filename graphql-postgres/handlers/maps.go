package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func DistrictsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
	SELECT 
		id,
		district_name,
		division_name,
		province_name,
		centroid_lat,
		centroid_long,
		ST_AsGeoJSON(boundary_polygon) AS geometry
	FROM pak_administrative_boundaries
`)

		if err != nil {
			log.Println("DISTRICT QUERY ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Feature struct {
			Type       string                 `json:"type"`
			Geometry   json.RawMessage        `json:"geometry"`
			Properties map[string]interface{} `json:"properties"`
		}

		var features []Feature

		for rows.Next() {
			var (
				id                        int
				district                  string
				division                  string
				province                  string
				centroidLat, centroidLong float64
				geojson                   string
			)

			err := rows.Scan(&id, &district, &division, &province, &centroidLat, &centroidLong, &geojson)

			if err != nil {
				log.Println("ROW SCAN ERROR:", err)
				continue
			}

			features = append(features, Feature{
				Type:     "Feature",
				Geometry: json.RawMessage(geojson),
				Properties: map[string]interface{}{
					"id":            id,
					"district_name": district,
					"division_name": division,
					"province_name": province,
					"centroid_lat":  centroidLat,
					"centroid_long": centroidLong,
				},
			})

		}

		response := map[string]interface{}{
			"type":     "FeatureCollection",
			"features": features,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
