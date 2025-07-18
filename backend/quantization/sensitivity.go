package quantization

import (
	"backend/types"
	// "encoding/json"
	"fmt"
	// "os/exec"
	"math/rand"
)

func AnalyzeLayers(modelID string, modelType string) ([]types.LayerData, error) {
	// scriptDir := fmt.Sprintf("./scripts/%s/analyze_sensitivity.py", modelType)
	// cmd := exec.Command("python", scriptDir, modelID)
	// output, err := cmd.Output()

	// if err != nil {
	// 	return nil, err
	// }

	// // JSON output from Python script -> write to []LayerData struct
	// var layerData []types.LayerData
	// json.Unmarshal(output, &layerData)
	// return layerData, nil

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

	return layers, nil
}
