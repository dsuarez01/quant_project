package types

type AnalysisRequest struct {
	ModelID   string `json:"modelId"`
	ModelType string `json:"modelType"`
}

// sensitivity data for a single layer
type LayerData struct {
	Name        string  `json:"name"`
	Sensitivity float64 `json:"sensitivity"`
	Type        string  `json:"type"`
}

// stores benchmark results
type PerformanceData struct {
	FP32 BenchmarkMetrics `json:"fp32"`
	INT8 BenchmarkMetrics `json:"int8"`
}

type BenchmarkMetrics struct {
	Throughput float64 `json:"throughput"`
	Latency    float64 `json:"latency"`
}

// store analysis results, send response
type AnalysisResponse struct {
	LayerSensitivity []LayerData     `json:"layerSensitivity"`
	PerformanceBench PerformanceData `json:"performanceBench"`
}
