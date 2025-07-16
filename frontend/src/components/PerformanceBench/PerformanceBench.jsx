import React from 'react';
import './PerformanceBench.css';

export default function PerformanceBench({ data, modelType }) {
  const throughputUnit = modelType === 'language' ? 'tokens/sec' : 'images/sec';
  const speedup = data.int8.throughput / data.fp32.throughput;

  return (
    <div className="performance-bench">
      <h3 className="performance-bench__title">Performance Benchmarks</h3>
      <p className="performance-bench__description">
        Comparing FP32 vs INT8 inference performance
      </p>

      <div className="performance-bench__cards">
        <BenchmarkCard
          title="FP32 (Baseline)"
          modifier="fp32"
          metrics={[
            { label: 'Throughput', value: data.fp32.throughput.toFixed(1), unit: throughputUnit },
            { label: 'Latency', value: data.fp32.latency.toFixed(1), unit: 'ms' }
          ]}
        />
        <BenchmarkCard
          title="INT8 (Quantized)"
          modifier="int8"
          metrics={[
            { label: 'Throughput', value: data.int8.throughput.toFixed(1), unit: throughputUnit },
            { label: 'Latency', value: data.int8.latency.toFixed(1), unit: 'ms' }
          ]}
        />
      </div>

      <div className="performance-bench__speedup">
        <span className="performance-bench__speedup-label">Speedup</span>
        <span className="performance-bench__speedup-value">{speedup.toFixed(2)}x</span>
      </div>
    </div>
  );
}

function BenchmarkCard({ title, modifier, metrics }) {
  return (
    <div className={`benchmark-card benchmark-card--${modifier}`}>
      <div className="benchmark-card__accent" />
      <h4 className="benchmark-card__title">{title}</h4>
      <div className="benchmark-card__metrics">
        {metrics.map((metric, index) => (
          <div key={index} className="benchmark-card__metric">
            <span className="benchmark-card__metric-label">{metric.label}</span>
            <span className="benchmark-card__metric-value">{metric.value}</span>
            <span className="benchmark-card__metric-unit">{metric.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}