package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func SurveyPointsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// Remove LIMIT to fetch ALL points
		rows, err := db.Query(`
			SELECT
				"ID",
				"Season",
				"Province",
				"District",
				"Date",
				"Latitude",
				"Longitude",
				"Code",
				"Land",
				"Description",
				"Stage",
				"district_id",
				ST_AsGeoJSON(ST_Force2D("geom")) AS geometry
			FROM public."ground_truthing_survey_ADB"
			WHERE "geom" IS NOT NULL
		`)
		if err != nil {
			log.Println("SURVEY QUERY ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Feature struct {
			Type       string                 `json:"type"`
			Geometry   json.RawMessage        `json:"geometry"`
			Properties map[string]interface{} `json:"properties"`
		}

		// Pre-allocate with estimated capacity
		features := make([]Feature, 0, 140000)

		for rows.Next() {
			var (
				id          string
				season      string
				province    string
				district    string
				date        string
				lat         float64
				lng         float64
				code        int
				land        string
				description string
				stage       sql.NullString
				districtID  sql.NullInt64
				geojson     string
			)

			if err := rows.Scan(
				&id,
				&season,
				&province,
				&district,
				&date,
				&lat,
				&lng,
				&code,
				&land,
				&description,
				&stage,
				&districtID,
				&geojson,
			); err != nil {
				log.Println("SURVEY SCAN ERROR:", err)
				continue
			}

			props := map[string]interface{}{
				"id":          id,
				"season":      season,
				"province":    province,
				"district":    district,
				"date":        date,
				"latitude":    lat,
				"longitude":   lng,
				"code":        code,
				"land":        land,
				"description": description,
				"stage":       stage.String,
			}

			if districtID.Valid {
				props["district_id"] = districtID.Int64
			}

			features = append(features, Feature{
				Type:       "Feature",
				Geometry:   json.RawMessage(geojson),
				Properties: props,
			})
		}

		log.Printf("Returning %d survey points", len(features))

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"type":     "FeatureCollection",
			"features": features,
		})
	}
}
