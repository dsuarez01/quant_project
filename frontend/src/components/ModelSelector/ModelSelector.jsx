import React, { useState } from 'react';
import './ModelSelector.css';

const models = {
  language: [
    { id: 'llama2-7b', name: 'LLaMA 2 7B', type: 'language', params: '7B' },
    { id: 'llama2-13b', name: 'LLaMA 2 13B', type: 'language', params: '13B' },
    { id: 'llama2-70b', name: 'LLaMA 2 70B', type: 'language', params: '70B', disabled: true }
  ],
  vision: [
    { id: 'deit-small', name: 'DeiT Small', type: 'vision', params: 'Small-Patch16-224' },
    { id: 'deit-large', name: 'DeiT Large', type: 'vision', params: 'Large-Patch16-224' }
  ]
};

export default function ModelSelector({ onModelSelect, selectedModel }) {
  return (
    <div className="model-selector">
      <h2 className="model-selector__title">Select a Model</h2>
      
      <div className="model-selector__grid">
        <div className="model-selector__section">
          <h3 className="model-selector__section-title">🗣️ Language Models</h3>
          <div className="model-selector__section-grid">
            {models.language.map(model => (
              <ModelCard
                key={model.id}
                model={model}
                isSelected={selectedModel?.id === model.id}
                onSelect={() => !model.disabled && onModelSelect(model)}
              />
            ))}
          </div>
        </div>

        <div className="model-selector__section">
          <h3 className="model-selector__section-title">👁️ Vision Models</h3>
          <div className="model-selector__section-grid">
            {models.vision.map(model => (
              <ModelCard
                key={model.id}
                model={model}
                isSelected={selectedModel?.id === model.id}
                onSelect={() => onModelSelect(model)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelCard({ model, isSelected, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`model-card ${isSelected ? 'model-card--selected' : ''} ${model.disabled ? 'model-card--disabled' : ''} ${isHovered && !model.disabled ? 'model-card--hovered' : ''}`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h4 className="model-card__title">{model.name}</h4>
      <p className="model-card__params">{model.params}</p>
      {model.disabled && (
        <span className="model-card__badge">GPU Memory Constraint</span>
      )}
    </div>
  );
}