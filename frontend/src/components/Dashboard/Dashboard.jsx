import React from 'react';
import './Dashboard.css';

export default function Dashboard({ model, sensitivityData, performanceData }) {
  const avgSensitivity = sensitivityData.reduce((sum, layer) => sum + layer.sensitivity, 0) / sensitivityData.length;
  const highSensitivityLayers = sensitivityData.filter(layer => layer.sensitivity > 0.4).length;
  const speedup = performanceData.int8.throughput / performanceData.fp32.throughput;

  const recommendation = avgSensitivity < 0.3 
    ? { level: 'excellent', text: 'Excellent candidate for INT8 quantization with minimal accuracy loss' }
    : avgSensitivity < 0.45
    ? { level: 'good', text: 'Good candidate for quantization, consider mixed precision for sensitive layers' }
    : { level: 'caution', text: 'Use quantization with caution, implement layer-wise mixed precision' };

  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Analysis Summary</h2>
      
      <div className="dashboard__summary-grid">
        <SummaryCard icon="📊" title="Model" value={model.name} detail={model.params} />
        <SummaryCard icon="⚡" title="Performance Gain" value={`${speedup.toFixed(2)}x`} detail="throughput increase" />
        <SummaryCard icon="🎯" title="Avg Sensitivity" value={avgSensitivity.toFixed(3)} detail={`${highSensitivityLayers} high-sensitivity layers`} />
        <SummaryCard icon="💾" title="Memory Savings" value="~75%" detail="reduction in model size" />
      </div>
    
      <div className={`dashboard__recommendation dashboard__recommendation--${recommendation.level}`}>
        <h3 className="dashboard__recommendation-title">Quantization Recommendation</h3>
        <p>{recommendation.text}</p>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value, detail }) {
  return (
    <div className="summary-card">
      <div className="summary-card__icon">{icon}</div>
      <h3 className="summary-card__title">{title}</h3>
      <p className="summary-card__value">{value}</p>
      <p className="summary-card__detail">{detail}</p>
    </div>
  );
}