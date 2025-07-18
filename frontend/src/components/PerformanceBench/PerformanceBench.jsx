import React from 'react';
import './PerformanceBench.css';

export default function PerformanceBench({ data, modelType }) {
  const throughputUnit = modelType === 'language' ? 'tokens/sec' : 'images/sec';
  const speedup = data.int4.throughput / data.fp16.throughput;

  return (
    <div className="performance-bench">
      <h3 className="performance-bench__title">Performance Benchmarks</h3>
      <p className="performance-bench__description">
        Comparing FP16 vs INT4 inference performance
      </p>

      <div className="performance-bench__cards">
        <BenchmarkCard
          title="FP16 (Baseline)"
          modifier="fp16"
          metrics={[
            { label: 'Throughput', value: data.fp16.throughput.toFixed(1), unit: throughputUnit },
            { label: 'Latency', value: data.fp16.latency.toFixed(1), unit: 'ms' }
          ]}
        />
        <BenchmarkCard
          title="INT4 (Quantized)"
          modifier="int4"
          metrics={[
            { label: 'Throughput', value: data.int4.throughput.toFixed(1), unit: throughputUnit },
            { label: 'Latency', value: data.int4.latency.toFixed(1), unit: 'ms' }
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