package main

import (
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	_ "github.com/lib/pq"

	"graphql-postgres/graph"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

// =========================
// SEND EMAIL FUNCTION
// =========================
func sendResetEmail(toEmail, token string) error {
	// You can also use os.Getenv if you want to keep credentials secret
	from := "engateeq1997@gmail.com"
	password := "nomq nqrk hvdo uypy"

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	resetLink := fmt.Sprintf("http://localhost:3000/reset-password?token=%s", token)

	msg := []byte(
		"Subject: Reset Your Password\r\n" +
			"MIME-Version: 1.0\r\n" +
			"Content-Type: text/plain; charset=\"utf-8\"\r\n\r\n" +
			"Click the link below to reset your password:\n\n" +
			resetLink + "\n\nIf you did not request this, ignore this email.",
	)

	auth := smtp.PlainAuth("", from, password, smtpHost)

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{toEmail}, msg)
}

// =========================
// CORS MIDDLEWARE
// =========================
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// =========================
// SIGNUP HANDLER
// =========================
type SignupRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

func SignupHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var req SignupRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		var exists bool
		err := db.QueryRow(`SELECT EXISTS(SELECT 1 FROM user_account_data WHERE "Email"=$1)`, req.Email).Scan(&exists)
		if err != nil {
			http.Error(w, "DB error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		if exists {
			http.Error(w, "Email already exists", http.StatusBadRequest)
			return
		}

		query := `
			INSERT INTO user_account_data ("Username", "Email", "Password", "Role")
			VALUES ($1, $2, $3, $4)
			RETURNING "ID";
		`

		var newID int
		err = db.QueryRow(query, req.Username, req.Email, req.Password, req.Role).Scan(&newID)
		if err != nil {
			http.Error(w, "DB error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]any{
			"status":  "success",
			"user_id": newID,
		})
	}
}

// =========================
// TOKEN GENERATOR
// =========================
func generateToken() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}

// =========================
// FORGOT PASSWORD HANDLER
// =========================
type ForgotPasswordRequest struct {
	Email string `json:"email"`
}

func ForgotPasswordHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var req ForgotPasswordRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Check if email exists
		var exists bool
		err := db.QueryRow(`SELECT EXISTS(SELECT 1 FROM user_account_data WHERE "Email"=$1)`, req.Email).Scan(&exists)
		if err != nil {
			http.Error(w, "DB error", http.StatusInternalServerError)
			return
		}

		if !exists {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Email not found",
			})
			return
		}

		token := generateToken()

		_, err = db.Exec(`INSERT INTO forgot_password_functionality (email, token) VALUES ($1, $2)`, req.Email, token)
		if err != nil {
			http.Error(w, "DB insert error", http.StatusInternalServerError)
			return
		}

		// 🔥 SEND EMAIL
		emailErr := sendResetEmail(req.Email, token)
		if emailErr != nil {
			log.Println("Email sending error:", emailErr)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Failed to send email: " + emailErr.Error(),
			})
			return
		}

		json.NewEncoder(w).Encode(map[string]string{
			"status":  "reset link sent",
			"message": "Check your email for the reset link",
		})
	}
}

// =========================
// RESET PASSWORD HANDLER
// =========================
type ResetPasswordRequest struct {
	Token       string `json:"token"`
	NewPassword string `json:"newPassword"`
}

func ResetPasswordHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var req ResetPasswordRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		var email string
		err := db.QueryRow(`SELECT email FROM forgot_password_functionality WHERE token = $1`, req.Token).Scan(&email)
		if err != nil {
			http.Error(w, "Invalid or expired token", http.StatusBadRequest)
			return
		}

		_, err = db.Exec(`UPDATE user_account_data SET "Password" = $1 WHERE "Email" = $2`, req.NewPassword, email)
		if err != nil {
			http.Error(w, "DB update error", http.StatusInternalServerError)
			return
		}

		// Optionally mark the token as used
		_, _ = db.Exec(`UPDATE forgot_password_functionality SET used = TRUE WHERE token = $1`, req.Token)

		json.NewEncoder(w).Encode(map[string]string{
			"status": "password updated successfully",
		})
	}
}

// =========================
// MAIN FUNCTION
// =========================
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	connStr := "user=postgres password=Angaar1997@# dbname=agro_DB sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to open DB: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}

	_, err = db.Exec(`SELECT setval('user_account_data_id_seq', (SELECT MAX("ID") FROM user_account_data))`)
	if err != nil {
		log.Fatalf("Failed to sync sequence: %v", err)
	}

	log.Println("Connected to PostgreSQL!")

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
		Resolvers: &graph.Resolver{DB: db},
	}))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)
	mux.HandleFunc("/signup", SignupHandler(db))
	mux.HandleFunc("/forgot-password", ForgotPasswordHandler(db))
	mux.HandleFunc("/reset-password", ResetPasswordHandler(db))

	handlerWithCORS := enableCORS(mux)

	log.Printf("Server running at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
