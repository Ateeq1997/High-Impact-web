package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"

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
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// SIGNUP HANDLER function
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

// Login handler function
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

// UserMManagement page handler function
func adminUsersHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT
				"ID",
				"Username",
				"Email",
				"Role",
				"Status",
				"Joined"
			FROM user_account_data
			ORDER BY "Joined" DESC
		`)
		if err != nil {
			log.Println("ADMIN USERS QUERY ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type User struct {
			ID       int    `json:"id"`
			Name     string `json:"name"`
			Email    string `json:"email"`
			Role     string `json:"role"`
			Status   string `json:"status"`
			JoinedAt string `json:"joinedAt"`
		}

		var users []User

		for rows.Next() {
			var (
				id       int
				username string
				email    string
				role     string
				status   bool
				joined   string
			)

			err := rows.Scan(&id, &username, &email, &role, &status, &joined)
			if err != nil {
				log.Println("ADMIN USER SCAN ERROR:", err)
				continue
			}

			users = append(users, User{
				ID:       id,
				Name:     username,
				Email:    email,
				Role:     role,
				Status:   map[bool]string{true: "active", false: "inactive"}[status],
				JoinedAt: joined[:10], // YYYY-MM-DD
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users)
	}
}

// Update userin usermanagement by admin function
func updateUserHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		type UpdateUser struct {
			ID     int    `json:"id"`
			Role   string `json:"role"`
			Status bool   `json:"status"`
		}

		var input UpdateUser
		json.NewDecoder(r.Body).Decode(&input)

		_, err := db.Exec(`
  UPDATE user_account_data
  SET "Role" = $1, "Status" = $2
  WHERE "ID" = $3
`, input.Role, input.Status, input.ID)

		if err != nil {
			log.Println("UPDATE USER ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

// Sub function for usermanagement page
func updateUserRoleHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		type Input struct {
			ID   int    `json:"id"`
			Role string `json:"role"`
		}

		var input Input
		json.NewDecoder(r.Body).Decode(&input)

		_, err := db.Exec(`
  UPDATE user_account_data
  SET "Role" = $1
  WHERE "ID" = $2
`, input.Role, input.ID)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"message": "Role updated"})
	}
}

// sub function for usermanagement page
func updateUserStatusHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		type Input struct {
			ID     int  `json:"id"`
			Status bool `json:"status"`
		}

		var input Input
		json.NewDecoder(r.Body).Decode(&input)

		_, err := db.Exec(`
  UPDATE user_account_data
  SET "Status" = $1
  WHERE "ID" = $2
`, input.Status, input.ID)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"message": "Status updated"})
	}
}

// ADMIN FARM LIST handler function
func adminFarmListHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT
				id,
				group_name,
				address,
				number_of_farms,
				number_of_workers,
				owner
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
			err := rows.Scan(
				&f.ID,
				&f.Name,
				&f.Address,
				&f.Farms,
				&f.Workers,
				&f.Owner,
			)
			if err != nil {
				continue
			}
			farms = append(farms, f)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(farms)
	}
}

// ADD ADMIN FARM HANDLER function
func addAdminFarmHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		type Input struct {
			Name    string `json:"name"`
			Address string `json:"address"`
			Farms   int    `json:"farms"`
			Workers int    `json:"workers"`
			Owner   string `json:"owner"`
		}

		var input Input
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON body", http.StatusBadRequest)
			return
		}

		var insertedID int

		err := db.QueryRow(`
			INSERT INTO admin_farm_list
			(group_name, address, number_of_farms, number_of_workers, owner)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id
		`,
			input.Name,
			input.Address,
			input.Farms,
			input.Workers,
			input.Owner,
		).Scan(&insertedID)

		if err != nil {
			log.Println("ADD FARM ERROR:", err)
			http.Error(w, "Failed to add farm", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":      insertedID,
			"name":    input.Name,
			"address": input.Address,
			"farms":   input.Farms,
			"workers": input.Workers,
			"owner":   input.Owner,
		})
	}
}

// UPDATE ADMIN FARM HANDLER function
// Update a farm in admin_farm_list
// UPDATE FARM
func updateAdminFarmHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Only PUT allowed", http.StatusMethodNotAllowed)
			return
		}

		type Input struct {
			ID      int    `json:"id"`
			Name    string `json:"name"`
			Address string `json:"address"`
			Farms   int    `json:"farms"`
			Workers int    `json:"workers"`
			Owner   string `json:"owner"`
		}

		var input Input
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		_, err := db.Exec(`
			UPDATE admin_farm_list
			SET group_name=$1, address=$2, number_of_farms=$3, number_of_workers=$4, owner=$5
			WHERE id=$6
		`, input.Name, input.Address, input.Farms, input.Workers, input.Owner, input.ID)

		if err != nil {
			log.Println("UPDATE FARM ERROR:", err)
			http.Error(w, "Failed to update farm", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"message": "Farm updated"})
	}
}

// DELETE FARM
func deleteAdminFarmHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodDelete {
			http.Error(w, "Only DELETE allowed", http.StatusMethodNotAllowed)
			return
		}

		idStr := r.URL.Query().Get("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid id", http.StatusBadRequest)
			return
		}

		_, err = db.Exec(`DELETE FROM admin_farm_list WHERE id=$1`, id)
		if err != nil {
			log.Println("DELETE FARM ERROR:", err)
			http.Error(w, "Failed to delete farm", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"message": "Farm deleted"})
	}
}

// ADMIN FARM LIST handler function
func adminFarmsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT 
				id,
				group_name,
				address,
				number_of_farms,
				number_of_workers,
				owner
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

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(farms)
	}
}

// map district handler function
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

// farmer farm list handler function
func farmsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
  SELECT 
    id,
    group_name,
    address,
    number_of_farms,
    number_of_workers
  FROM farm_list
  ORDER BY id DESC
`)

		if err != nil {
			log.Println("FARMS QUERY ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
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
			err := rows.Scan(&f.ID, &f.Name, &f.Address, &f.Farms, &f.Workers)
			if err != nil {
				log.Println("SCAN ERROR:", err)
				continue
			}
			farms = append(farms, f)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(farms)
	}
}

// farmer project board handler function
func projectsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		rows, err := db.Query(`
			SELECT
				id,
				region,
				city,
				district,
				address,
				size_sqm,
				latitude,
				longitude
			FROM user_project
			ORDER BY id DESC
		`)
		if err != nil {
			log.Println("PROJECTS QUERY ERROR:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Project struct {
			ID       int     `json:"id"`
			Name     string  `json:"name"`
			Location string  `json:"location"`
			Status   string  `json:"status"`
			Lat      float64 `json:"lat"`
			Lng      float64 `json:"lng"`
			Size     int     `json:"size"`
		}

		var projects []Project

		for rows.Next() {
			var p Project
			var region, city, district, address string

			err := rows.Scan(
				&p.ID,
				&region,
				&city,
				&district,
				&address,
				&p.Size,
				&p.Lat,
				&p.Lng,
			)
			if err != nil {
				log.Println("PROJECT SCAN ERROR:", err)
				continue
			}

			// frontend-friendly fields
			p.Name = district + " Project"
			p.Location = city + ", " + region
			p.Status = "opportunities" // default column

			projects = append(projects, p)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(projects)
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
	mux.HandleFunc("/farms", farmsHandler(db))
	mux.HandleFunc("/projects", projectsHandler(db))
	mux.HandleFunc("/admin/users", adminUsersHandler(db))
	mux.HandleFunc("/admin/user/role", updateUserRoleHandler(db))
	mux.HandleFunc("/admin/user/status", updateUserStatusHandler(db))
	mux.HandleFunc("/admin/users/update", updateUserHandler(db))
	mux.HandleFunc("/admin/farms/add", addAdminFarmHandler(db))
	mux.HandleFunc("/admin/farms", adminFarmsHandler(db))
	mux.HandleFunc("/admin/farms/update", updateAdminFarmHandler(db))
	mux.HandleFunc("/admin/farms/delete", deleteAdminFarmHandler(db))

	log.Println("Server running on port", port)
	http.ListenAndServe(":"+port, enableCORS(mux))

}
