package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

// GET farms
func AdminFarmsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT id, group_name, address, number_of_farms, number_of_workers, owner
			FROM admin_farm_list
			ORDER BY id DESC
		`)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		defer rows.Close()

		type Farm struct {
			ID      int    `json:"id"`
			Name    string `json:"name"`
			Address string `json:"address"`
			Farms   int    `json:"farms"`
			Workers int    `json:"workers"`
			Owner   string `json:"owner"`
		}

		var farms []Farm
		for rows.Next() {
			var f Farm
			rows.Scan(&f.ID, &f.Name, &f.Address, &f.Farms, &f.Workers, &f.Owner)
			farms = append(farms, f)
		}

		json.NewEncoder(w).Encode(farms)
	}
}

// ADD farm
func AddAdminFarmHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		type Input struct {
			Name    string `json:"name"`
			Address string `json:"address"`
			Farms   int    `json:"farms"`
			Workers int    `json:"workers"`
			Owner   string `json:"owner"`
		}

		var input Input
		json.NewDecoder(r.Body).Decode(&input)

		_, err := db.Exec(`
			INSERT INTO admin_farm_list
			(group_name, address, number_of_farms, number_of_workers, owner)
			VALUES ($1,$2,$3,$4,$5)
		`, input.Name, input.Address, input.Farms, input.Workers, input.Owner)

		if err != nil {
			log.Println(err)
			http.Error(w, "Insert failed", 500)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}

// UPDATE farm
func UpdateAdminFarmHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		type Input struct {
			ID      int    `json:"id"`
			Name    string `json:"name"`
			Address string `json:"address"`
			Farms   int    `json:"farms"`
			Workers int    `json:"workers"`
			Owner   string `json:"owner"`
		}

		var input Input
		json.NewDecoder(r.Body).Decode(&input)

		db.Exec(`
			UPDATE admin_farm_list
			SET group_name=$1,address=$2,number_of_farms=$3,number_of_workers=$4,owner=$5
			WHERE id=$6
		`, input.Name, input.Address, input.Farms, input.Workers, input.Owner, input.ID)

		w.WriteHeader(http.StatusOK)
	}
}

// DELETE farm
func DeleteAdminFarmHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id, _ := strconv.Atoi(r.URL.Query().Get("id"))
		db.Exec(`DELETE FROM admin_farm_list WHERE id=$1`, id)

		w.WriteHeader(http.StatusOK)
	}
}
