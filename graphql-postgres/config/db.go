package config

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func NewDB() *sql.DB {
	// Use hardcoded Supabase URL
	db, err := sql.Open("postgres", "host=aws-1-ap-southeast-1.pooler.supabase.com port=5432 user=postgres.pmqwjtsknclhrswkjvuy password=Impact123@# dbname=agroDB sslmode=require sslmode=require")
	if err != nil {
		log.Fatal(err)
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to PostgreSQL")
	return db
}
