package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func FarmsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, _ := db.Query(`
			SELECT id, group_name, address,
			       number_of_farms, number_of_workers
			FROM farm_list
		`)
		defer rows.Close()

		type Farm struct {
			ID      int    `json:"id"`
			Name    string `json:"name"`
			Address string `json:"address"`
			Farms   int    `json:"farms"`
			Workers int    `json:"workers"`
		}

		var farms []Farm
		for rows.Next() {
			var f Farm
			rows.Scan(&f.ID, &f.Name, &f.Address, &f.Farms, &f.Workers)
			farms = append(farms, f)
		}

		json.NewEncoder(w).Encode(farms)
	}
}
