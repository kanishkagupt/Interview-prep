import React, { useState } from "react";
import "../styles/PerformanceAnalytics.css";

function PerformanceAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState("");
  const [data, setData] = useState(null);

  const analyticsData = {
    Accuracy: {
      value: "85%",
      description: "Your accuracy rate is high. Keep practicing!",
      level: "Good"
    },
    "Response Time": {
      value: "4.5 seconds",
      description: "Your average response time is decent, aim for faster responses!",
      level: "Average"
    },
    "Confidence Level": {
      value: "7.8/10",
      description: "Your confidence is growing, maintain a strong presence!",
      level: "Good"
    }
  };

  const generateReport = () => {
    if (selectedMetric) {
      setData(analyticsData[selectedMetric]);
    }
  };

  return (
    <div className="analytics-container">
      <h1>Performance Analytics</h1>
      <p>Track your progress and improve your skills!</p>
      <div className="input-container">
        <select onChange={(e) => setSelectedMetric(e.target.value)}>
          <option value="">Select a Metric</option>
          {Object.keys(analyticsData).map((metric) => (
            <option key={metric} value={metric}>{metric}</option>
          ))}
        </select>
        <button className="generate-button" onClick={generateReport}>Generate Report</button>
      </div>
      {data && (
        <div className="report-box">
          <h2>Report</h2>
          <p><strong>Value:</strong> {data.value}</p>
          <p><strong>Level:</strong> {data.level}</p>
          <p><strong>Description:</strong> {data.description}</p>
        </div>
      )}
    </div>
  );
}

export default PerformanceAnalytics;