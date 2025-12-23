package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func AdminUsersHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT "ID","Username","Email","Role","Status","Joined"
			FROM user_account_data ORDER BY "Joined" DESC
		`)
		if err != nil {
			log.Println(err)
			http.Error(w, "DB error", 500)
			return
		}
		defer rows.Close()

		var users []map[string]interface{}

		for rows.Next() {
			var id int
			var name, email, role, joined string
			var status bool

			rows.Scan(&id, &name, &email, &role, &status, &joined)

			users = append(users, map[string]interface{}{
				"id":       id,
				"name":     name,
				"email":    email,
				"role":     role,
				"status":   status,
				"joinedAt": joined[:10],
			})
		}

		json.NewEncoder(w).Encode(users)
	}
}

func UpdateUserHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var input struct {
			ID     int    `json:"id"`
			Role   string `json:"role"`
			Status bool   `json:"status"`
		}

		json.NewDecoder(r.Body).Decode(&input)

		_, err := db.Exec(`
			UPDATE user_account_data SET "Role"=$1,"Status"=$2 WHERE "ID"=$3
		`, input.Role, input.Status, input.ID)

		if err != nil {
			http.Error(w, err.Error(), 500)
		}
	}
}

func UpdateUserRoleHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var i struct {
			ID   int    `json:"id"`
			Role string `json:"role"`
		}
		json.NewDecoder(r.Body).Decode(&i)
		db.Exec(`UPDATE user_account_data SET "Role"=$1 WHERE "ID"=$2`, i.Role, i.ID)
	}
}

func UpdateUserStatusHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var i struct {
			ID     int  `json:"id"`
			Status bool `json:"status"`
		}
		json.NewDecoder(r.Body).Decode(&i)
		db.Exec(`UPDATE user_account_data SET "Status"=$1 WHERE "ID"=$2`, i.Status, i.ID)
	}
}
