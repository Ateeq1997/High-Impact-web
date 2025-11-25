package main // Make sure this is the correct package name for your main entry point

import (
	"database/sql" // Standard Go database package
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq" // PostgreSQL driver (needed for the "postgres" string)

	"graphql-postgres/graph" // Ensure this module path matches your project's module name

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

// ----------- MAIN FUNCTION -----------
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// --- 1. ESTABLISH POSTGRES CONNECTION ---
	connStr := "user=postgres password=Angaar1997@# dbname=agro_DB sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to open database connection: %v", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	log.Println("Successfully connected to the PostgreSQL database!")
	// --- CONNECTION END ---

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
		Resolvers: &graph.Resolver{DB: db},
	}))

	// Create a mux (router) and attach handlers
	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	// Wrap mux with CORS middleware
	handlerWithCORS := enableCORS(mux)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
