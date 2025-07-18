package main

import (
	"backend/handlers"
	"log"
	"net/http"
	"os"
)

func main() {
	// Enabling CORS for frontend
	http.HandleFunc("/api/analyze", corsHandler(handlers.HandleAnalyze))

	// (default to localhost for dev)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Backend server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func corsHandler(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get allowed origin from environment
		// (default to localhost for dev)
		allowedOrigin := os.Getenv("FRONTEND_URL")
		if allowedOrigin == "" {
			allowedOrigin = "http://localhost:5173"
		}

		w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// To handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler(w, r)
	}
}
