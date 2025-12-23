package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func AdminGroupsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, _ := db.Query(`
			SELECT "ID","Username","Email","Phone","Role","Status","Joined"
			FROM group_list
			ORDER BY "ID"
		`)
		defer rows.Close()

		type Group struct {
			ID     int    `json:"id"`
			Name   string `json:"name"`
			Email  string `json:"email"`
			Phone  string `json:"phone"`
			Role   string `json:"role"`
			Status string `json:"status"`
			Joined string `json:"joined"`
		}

		var groups []Group
		for rows.Next() {
			var g Group
			var status bool
			rows.Scan(&g.ID, &g.Name, &g.Email, &g.Phone, &g.Role, &status, &g.Joined)
			if status {
				g.Status = "Active"
			} else {
				g.Status = "Inactive"
			}
			groups = append(groups, g)
		}

		json.NewEncoder(w).Encode(groups)
	}
}
