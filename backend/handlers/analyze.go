package handlers

import (
	"backend/types"
	"encoding/json"
	"fmt"
	"math/rand"
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

	// generate fake data for now
	layers := make([]types.LayerData, 12)
	for i := 0; i < 12; i++ {
		layerType := "attention"
		if i%3 == 1 {
			layerType = "mlp"
		} else if i%3 == 2 {
			layerType = "norm"
		}
		layers[i] = types.LayerData{
			Name:        fmt.Sprintf("Layer %d", i+1),
			Sensitivity: rand.Float64()*0.5 + 0.2, // range btwn. 0.2 and 0.7 for now
			Type:        layerType,
		}
	}

	isLanguageModel := req.ModelID == "llama2-7b" || req.ModelID == "llama2-13b"

	var perfData types.PerformanceData

	// TO-DO: call different routines for fetching performance data
	if isLanguageModel {
		perfData = types.PerformanceData{
			FP32: types.BenchmarkMetrics{Throughput: 145.2, Latency: 6.9},
			INT8: types.BenchmarkMetrics{Throughput: 412.7, Latency: 2.4},
		}
	} else {
		perfData = types.PerformanceData{
			FP32: types.BenchmarkMetrics{Throughput: 89.3, Latency: 11.2},
			INT8: types.BenchmarkMetrics{Throughput: 267.8, Latency: 3.7},
		}
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
