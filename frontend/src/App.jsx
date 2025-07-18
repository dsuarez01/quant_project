import React, { useState } from 'react';
import ModelSelector from './components/ModelSelector/ModelSelector.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import LayerSensitivity from './components/LayerSensitivity/LayerSensitivity.jsx';
import PerformanceBench from './components/PerformanceBench/PerformanceBench.jsx';
import Spinner from './components/Spinner/Spinner.jsx';
import { analyzeModel } from './services/api.js';
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
    console.log("Starting analysis...", selectedModel);
    setIsAnalyzing(true);
    try {
      const data = await analyzeModel(selectedModel.id, selectedModel.type);
      console.log("Received data:", data);
      setSensitivityData(data.layerSensitivity);
      setPerformanceData(data.performanceBench);
    } catch (error) {
      console.error('Error running analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
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