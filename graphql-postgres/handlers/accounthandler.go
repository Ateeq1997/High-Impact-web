package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

func GetAccountHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Get email from query parameter
		email := r.URL.Query().Get("email")
		if email == "" {
			log.Println("❌ ERROR: Email parameter missing")
			http.Error(w, "Email required", http.StatusBadRequest)
			return
		}

		// Trim whitespace
		email = strings.TrimSpace(email)

		log.Printf("🔍 DEBUG - Searching for email: '%s' (length: %d)", email, len(email))

		// First, let's check if ANY users exist
		var count int
		db.QueryRow(`SELECT COUNT(*) FROM user_account_data`).Scan(&count)
		log.Printf("🔍 DEBUG - Total users in database: %d", count)

		// Let's see what emails exist in the database
		rows, _ := db.Query(`SELECT "Email" FROM user_account_data LIMIT 5`)
		if rows != nil {
			defer rows.Close()
			log.Println("🔍 DEBUG - Sample emails in database:")
			for rows.Next() {
				var sampleEmail string
				rows.Scan(&sampleEmail)
				log.Printf("   - '%s' (length: %d)", sampleEmail, len(sampleEmail))
			}
		}

		var user struct {
			ID       int    `json:"id"`
			Username string `json:"username"`
			Email    string `json:"email"`
			Role     string `json:"role"`
			Status   bool   `json:"status"`
			Joined   string `json:"joined"`
		}

		// Query database
		err := db.QueryRow(`
			SELECT "ID","Username","Email","Role","Status","Joined"
			FROM user_account_data
			WHERE LOWER(TRIM("Email"))=LOWER(TRIM($1))
		`, email).Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Role,
			&user.Status,
			&user.Joined,
		)

		if err == sql.ErrNoRows {
			log.Printf("❌ ERROR: User not found with email: '%s'", email)
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		if err != nil {
			log.Printf("❌ ERROR: Database query failed: %v", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		log.Printf("✅ SUCCESS: Found user: %s (ID: %d, Role: %s, Email: %s)",
			user.Username, user.ID, user.Role, user.Email)

		// Send response
		json.NewEncoder(w).Encode(user)
	}
}
