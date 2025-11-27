package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"

	"graphql-postgres/graph"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

// ----------- CORS MIDDLEWARE -----------
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

// ------------ SIGNUP HANDLER (REST API) ------------
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
			http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		log.Printf("Signup request: %+v", req)

		// Check if email already exists
		var exists bool
		err := db.QueryRow(`SELECT EXISTS(SELECT 1 FROM user_account_data WHERE "Email"=$1)`, req.Email).Scan(&exists)
		if err != nil {
			log.Printf("DB error checking email: %+v", err)
			http.Error(w, "DB error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		if exists {
			http.Error(w, "Email already exists", http.StatusBadRequest)
			return
		}

		// Insert into DB (store plain password)
		query := `
			INSERT INTO user_account_data ("Username", "Email", "Password", "Role")
			VALUES ($1, $2, $3, $4)
			RETURNING "ID";
		`

		var newID int
		err = db.QueryRow(query, req.Username, req.Email, req.Password, req.Role).Scan(&newID)
		if err != nil {
			log.Printf("DB INSERT error: %+v", err)
			http.Error(w, "DB error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		resp := map[string]any{
			"status":  "success",
			"user_id": newID,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

// ----------- MAIN FUNCTION -----------
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

	// Sync sequence
	_, err = db.Exec(`SELECT setval('user_account_data_id_seq', (SELECT MAX("ID") FROM user_account_data))`)
	if err != nil {
		log.Fatalf("Failed to sync sequence: %v", err)
	}

	log.Println("Connected to PostgreSQL!")

	// GraphQL server
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
		Resolvers: &graph.Resolver{DB: db},
	}))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)
	mux.HandleFunc("/signup", SignupHandler(db))

	handlerWithCORS := enableCORS(mux)

	log.Printf("Server running at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
