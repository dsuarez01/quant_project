import React, { useState } from 'react';
import ModelSelector from './components/ModelSelector/ModelSelector.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import LayerSensitivity from './components/LayerSensitivity/LayerSensitivity.jsx';
import PerformanceBench from './components/PerformanceBench/PerformanceBench.jsx';
import Spinner from './components/Spinner/Spinner.jsx';
import './App.css';

export default function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [sensitivityData, setSensitivityData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSensitivityData(null);
    setPerformanceData(null);
  };

  const handleAnalyze = async () => {
    console.log("Starting analysis...");
    setIsAnalyzing(true);
    setTimeout(() => {
      const layers = Array.from({ length: 12 }, (_, i) => ({
        name: `Layer ${i + 1}`,
        sensitivity: Math.random() * 0.5 + 0.2,
        type: i % 3 === 0 ? 'attention' : i % 3 === 1 ? 'mlp' : 'norm'
      }));
      setSensitivityData(layers);
      
      setPerformanceData({
        fp32: {
          throughput: selectedModel?.type === 'language' ? 145.2 : 89.3,
          latency: selectedModel?.type === 'language' ? 6.9 : 11.2
        },
        int8: {
          throughput: selectedModel?.type === 'language' ? 412.7 : 267.8,
          latency: selectedModel?.type === 'language' ? 2.4 : 3.7
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">Model Quantization Analyzer</h1>
          <p className="header-subtitle">Analyze quantization sensitivity and performance for ML models</p>
        </div>
      </header>

      <main className="app-main">
        <ModelSelector onModelSelect={handleModelSelect} selectedModel={selectedModel} />

        {selectedModel && (
          <div className="analysis-section">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`analyze-button ${isAnalyzing ? 'analyzing' : ''}`}
            >
              {isAnalyzing ? (
                <>
                  <Spinner />
                  Analyzing...
                </>
              ) : (
                'Run Analysis'
              )}
            </button>

            {sensitivityData && performanceData && (
              <>
                <Dashboard 
                  model={selectedModel}
                  sensitivityData={sensitivityData}
                  performanceData={performanceData}
                />
                <div className="data-grid">
                  <LayerSensitivity data={sensitivityData} />
                  <PerformanceBench data={performanceData} modelType={selectedModel.type} />
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}