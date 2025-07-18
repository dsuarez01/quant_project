package handlers

import (
	"backend/quantization"
	"backend/types"
	"encoding/json"
	"net/http"
)

func HandleAnalyze(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req types.AnalysisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	layers, err_layers := quantization.AnalyzeLayers(req.ModelID, req.ModelType)
	perfData, err_perfData := quantization.RunBenchmark(req.ModelID, req.ModelType)

	if err_layers != nil {
		http.Error(w, "Error in layer analysis code", http.StatusInternalServerError)
		return
	}

	if err_perfData != nil {
		http.Error(w, "Error in benchmarking code", http.StatusInternalServerError)
		return
	}

	response := types.AnalysisResponse{
		LayerSensitivity: layers,
		PerformanceBench: perfData,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
