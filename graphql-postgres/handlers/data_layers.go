package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func DataLayersHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT id, name, type, source, status
			FROM data_layers_management
			ORDER BY id ASC
		`)
		if err != nil {
			http.Error(w, "Failed to fetch layers", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Layer struct {
			ID     int    `json:"id"`
			Name   string `json:"name"`
			Type   string `json:"type"`
			Source string `json:"source"`
			Status string `json:"status"`
		}

		var layers []Layer
		for rows.Next() {
			var l Layer
			if err := rows.Scan(&l.ID, &l.Name, &l.Type, &l.Source, &l.Status); err != nil {
				continue
			}
			layers = append(layers, l)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		json.NewEncoder(w).Encode(layers)
	}
}

func AddDataLayerHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		type Input struct {
			Name   string `json:"name"`
			Type   string `json:"type"`
			Source string `json:"source"`
		}

		var input Input
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		_, err := db.Exec(`
    INSERT INTO data_layers_management (name, "type", source, status)
    VALUES ($1, $2, $3, 'inactive')
`, input.Name, input.Type, input.Source)

		if err != nil {
			http.Error(w, "Failed to add layer", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}

func ToggleLayerStatusHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id := r.URL.Query().Get("id")
		if id == "" {
			http.Error(w, "Missing ID", http.StatusBadRequest)
			return
		}

		_, err := db.Exec(`
			UPDATE data_layers_management
			SET status = CASE 
				WHEN status = 'active' THEN 'inactive'
				ELSE 'active'
			END
			WHERE id = $1
		`, id)

		if err != nil {
			http.Error(w, "Failed to update status", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}
