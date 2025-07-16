import React from 'react';
import './LayerSensitivity.css';

export default function LayerSensitivity({ data }) {
  const maxSensitivity = Math.max(...data.map(d => d.sensitivity));

  return (
    <div className="layer-sensitivity">
      <h3 className="layer-sensitivity__title">Layer Sensitivity Analysis</h3>
      <p className="layer-sensitivity__description">
        Higher values indicate layers more sensitive to quantization
      </p>
      
      <div className="layer-sensitivity__bars">
        {[...data].sort((a, b) => b.sensitivity - a.sensitivity).map((layer, index) => (
          <LayerBar key={index} layer={layer} maxSensitivity={maxSensitivity} />
        ))}
      </div>

      <div className="layer-sensitivity__legend">
        <LegendItem color="#10b981" label="Low Sensitivity" />
        <LegendItem color="#f59e0b" label="Medium Sensitivity" />
        <LegendItem color="#ef4444" label="High Sensitivity" />
      </div>
    </div>
  );
}

function LayerBar({ layer, maxSensitivity }) {
  const normalized = layer.sensitivity / maxSensitivity;
  const sensitivityLevel = normalized < 0.33 ? 'low' : normalized < 0.66 ? 'medium' : 'high';
  
  return (
    <div className="layer-bar">
      <div className="layer-bar__info">
        <div className="layer-bar__name">{layer.name}</div>
        <div className="layer-bar__type">{layer.type}</div>
      </div>
      <div className="layer-bar__container">
        <div 
          className={`layer-bar__fill layer-bar__fill--${sensitivityLevel}`}
          style={{ width: `${(layer.sensitivity / maxSensitivity) * 100}%` }}
        >
          <span className="layer-bar__value">{Math.round(normalized * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <span 
        className="legend-item__indicator"
        style={{ backgroundColor: color }}
      />
      <span className="legend-item__label">{label}</span>
    </div>
  );
}