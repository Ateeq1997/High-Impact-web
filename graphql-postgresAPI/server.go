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

	"golang.org/x/crypto/bcrypt"
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

// ------------- SIGNUP HANDLER -------------
func signupHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		type SignupInput struct {
			Username string `json:"username"`
			Email    string `json:"email"`
			Password string `json:"password"`
			Role     string `json:"role"`
		}

		var input SignupInput
		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			http.Error(w, "Invalid JSON body", http.StatusBadRequest)
			return
		}

		// -------- HASH PASSWORD --------
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Password hashing failed", http.StatusInternalServerError)
			return
		}

		// -------- INSERT QUERY --------
		query := `
	INSERT INTO user_account_data ("Username", "Email", "Password", "Role", "Status", "Joined")
	VALUES ($1, $2, $3, $4, true, NOW())
`

		_, err = db.Exec(query, input.Username, input.Email, string(hashedPassword), input.Role)
		if err != nil {
			log.Println("SIGNUP INSERT ERROR:", err)
			http.Error(w, "Database insert error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// -------- SUCCESS RESPONSE --------
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Signup successful",
		})
	}
}

func loginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		type LoginInput struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		var input LoginInput
		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		var storedHash string
		var username string
		var role string
		var status bool

		query := `
			SELECT "Password", "Username", "Role", "Status"
			FROM user_account_data
			WHERE "Email" = $1
		`

		err = db.QueryRow(query, input.Email).Scan(&storedHash, &username, &role, &status)
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
		if err != nil {
			log.Println("LOGIN ERROR:", err)
			http.Error(w, "Server error", http.StatusInternalServerError)
			return
		}

		// 🔑 COMPARE PASSWORDS (THIS IS THE FIX)
		err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(input.Password))
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		if !status {
			http.Error(w, "Account is disabled", http.StatusForbidden)
			return
		}

		// ✅ LOGIN SUCCESS
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":  "Login successful",
			"username": username,
			"role":     role,
		})
	}
}

func districtsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
	SELECT 
		id,
		district_name,
		division_name,
		province_name,
		centroid_lat,
		centroid_long,
		ST_AsGeoJSON(boundary_polygon) AS geometry
	FROM pak_administrative_boundaries
`)

		if err != nil {
			log.Println("DISTRICT QUERY ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Feature struct {
			Type       string                 `json:"type"`
			Geometry   json.RawMessage        `json:"geometry"`
			Properties map[string]interface{} `json:"properties"`
		}

		var features []Feature

		for rows.Next() {
			var (
				id                        int
				district                  string
				division                  string
				province                  string
				centroidLat, centroidLong float64
				geojson                   string
			)

			err := rows.Scan(&id, &district, &division, &province, &centroidLat, &centroidLong, &geojson)

			if err != nil {
				log.Println("ROW SCAN ERROR:", err)
				continue
			}

			features = append(features, Feature{
				Type:     "Feature",
				Geometry: json.RawMessage(geojson),
				Properties: map[string]interface{}{
					"id":            id,
					"district_name": district,
					"division_name": division,
					"province_name": province,
					"centroid_lat":  centroidLat,
					"centroid_long": centroidLong,
				},
			})

		}

		response := map[string]interface{}{
			"type":     "FeatureCollection",
			"features": features,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// ----------- MAIN FUNCTION -----------
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	connStr := "host=aws-1-ap-southeast-1.pooler.supabase.com port=5432 user=postgres.pmqwjtsknclhrswkjvuy password=Impact123@# dbname=agroDB sslmode=require"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to open database connection: %v", err)
	}
	defer db.Close()

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	log.Println("Successfully connected to Supabase PostgreSQL!")

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
		Resolvers: &graph.Resolver{DB: db},
	}))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	// ADD SIGNUP API
	mux.HandleFunc("/signup", signupHandler(db))
	mux.HandleFunc("/login", loginHandler(db))
	mux.HandleFunc("/districts", districtsHandler(db))

	handlerWithCORS := enableCORS(mux)

	log.Printf("Server running at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
