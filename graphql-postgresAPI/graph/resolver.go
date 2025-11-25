package graph

import (
	// These imports are typically needed for Resolver functions,
	// but if those functions were moved out, these must be removed.
	// "context"
	// "fmt"
	// "graphql-postgres/graph/model"
	"database/sql"
)

// --- Resolver Struct Definitions ---

// Resolver defines the primary application context, holding the database connection.
type Resolver struct {
	DB *sql.DB
}
