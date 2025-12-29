package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func SignupHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var input struct {
			Username string `json:"username"`
			Email    string `json:"email"`
			Password string `json:"password"`
			Role     string `json:"role"`
		}

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON body", http.StatusBadRequest)
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Password hashing failed", http.StatusInternalServerError)
			return
		}

		_, err = db.Exec(`
			INSERT INTO user_account_data ("Username","Email","Password","Role","Status","Joined")
			VALUES ($1,$2,$3,$4,true,NOW())
		`, input.Username, input.Email, string(hash), input.Role)

		if err != nil {
			log.Println(err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "Signup successful"})
	}
}

func LoginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		var input struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			log.Printf("❌ ERROR: Invalid JSON: %v", err)
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		log.Printf("🔍 LOGIN ATTEMPT: %s", input.Email)

		var hash, username, role string
		var status bool

		err := db.QueryRow(`
			SELECT "Password","Username","Role","Status"
			FROM user_account_data WHERE "Email"=$1
		`, input.Email).Scan(&hash, &username, &role, &status)

		if err != nil {
			log.Printf("❌ ERROR: User not found: %s", input.Email)
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if bcrypt.CompareHashAndPassword([]byte(hash), []byte(input.Password)) != nil {
			log.Printf("❌ ERROR: Invalid password for: %s", input.Email)
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if !status {
			log.Printf("❌ ERROR: Account disabled: %s", input.Email)
			http.Error(w, "Account disabled", http.StatusForbidden)
			return
		}

		// Create response with explicit fields
		response := map[string]string{
			"message":  "Login successful",
			"username": username,
			"email":    input.Email,
			"role":     role,
		}

		log.Printf("✅ LOGIN SUCCESS: %s (Role: %s)", input.Email, role)
		log.Printf("📤 SENDING RESPONSE: %+v", response)

		json.NewEncoder(w).Encode(response)
	}
}
