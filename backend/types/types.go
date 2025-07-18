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
	FP16 BenchmarkMetrics `json:"fp16"`
	INT4 BenchmarkMetrics `json:"int4"`
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
