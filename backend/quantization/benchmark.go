package quantization

import (
	"backend/types"
	// "encoding/json"
	// "fmt"
	// "os/exec"
)

func RunBenchmark(modelID string, modelType string) (types.PerformanceData, error) {
	// scriptDir := fmt.Sprintf("./scripts/%s/perf_benchmark.py", modelType)
	// cmd := exec.Command("python", scriptDir, modelID)
	// output, err := cmd.Output()

	// if err != nil {
	// 	return types.PerformanceData{}, err
	// }

	// // JSON output from Python script -> write to []LayerData struct
	// var perfData types.PerformanceData
	// json.Unmarshal(output, &perfData)
	// return perfData, nil

	var perfData types.PerformanceData

	// generate fake data for now
	if modelType == "language" {
		perfData = types.PerformanceData{
			FP16: types.BenchmarkMetrics{Throughput: 145.2, Latency: 6.9},
			INT4: types.BenchmarkMetrics{Throughput: 412.7, Latency: 2.4},
		}
	} else {
		perfData = types.PerformanceData{
			FP16: types.BenchmarkMetrics{Throughput: 89.3, Latency: 11.2},
			INT4: types.BenchmarkMetrics{Throughput: 267.8, Latency: 3.7},
		}
	}

	return perfData, nil
}
