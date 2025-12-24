package main

import (
	"log"
	"net/http"
	"os"

	"graphql-postgres/config"
	"graphql-postgres/graph"
	"graphql-postgres/middleware"
	"graphql-postgres/routes"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db := config.NewDB()

	defer db.Close()

	srv := handler.NewDefaultServer(
		graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{DB: db},
			},
		),
	)

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	// ✅ All REST routes registered here
	routes.RegisterRoutes(mux, db)

	log.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, middleware.EnableCORS(mux)))
}
