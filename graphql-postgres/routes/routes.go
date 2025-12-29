package routes

import (
	"database/sql"
	"net/http"

	"graphql-postgres/handlers"
)

// RegisterRoutes connects all REST endpoints
func RegisterRoutes(mux *http.ServeMux, db *sql.DB) {

	// ===== MAPS =====
	mux.HandleFunc("/districts", handlers.DistrictsHandler(db))
	mux.HandleFunc("/survey-points", handlers.SurveyPointsHandler(db))

	// ===== ACCOUNT (FIXED) =====
	mux.HandleFunc("/account/me", handlers.GetAccountHandler(db))
	// ===== FARMS (USER) =====
	mux.HandleFunc("/farms", handlers.FarmsHandler(db))

	// ===== PROJECTS (USER) =====
	mux.HandleFunc("/projects", handlers.ProjectsHandler(db))

	// ===== ADMIN : USERS =====
	mux.HandleFunc("/admin/users", handlers.AdminUsersHandler(db))
	mux.HandleFunc("/admin/users/update", handlers.UpdateUserHandler(db))
	mux.HandleFunc("/admin/user/role", handlers.UpdateUserRoleHandler(db))
	mux.HandleFunc("/admin/user/status", handlers.UpdateUserStatusHandler(db))

	// ===== ADMIN : FARMS =====
	mux.HandleFunc("/admin/farms", handlers.AdminFarmsHandler(db))
	mux.HandleFunc("/admin/farms/add", handlers.AddAdminFarmHandler(db))
	mux.HandleFunc("/admin/farms/update", handlers.UpdateAdminFarmHandler(db))
	mux.HandleFunc("/admin/farms/delete", handlers.DeleteAdminFarmHandler(db))

	// ===== ADMIN : GROUPS =====
	mux.HandleFunc("/admin/groups", handlers.AdminGroupsHandler(db))

	// ===== ADMIN : PROJECTS =====
	mux.HandleFunc("/admin/projects", handlers.AdminProjectsHandler(db))

	// ===== ADMIN : DATA LAYERS =====
	mux.HandleFunc("/admin/data-layers", handlers.DataLayersHandler(db))
	mux.HandleFunc("/admin/data-layers/add", handlers.AddDataLayerHandler(db))
	mux.HandleFunc("/admin/data-layers/toggle", handlers.ToggleLayerStatusHandler(db))

	// ===== AUTH =====
	mux.HandleFunc("/signup", handlers.SignupHandler(db))
	mux.HandleFunc("/login", handlers.LoginHandler(db))
}
