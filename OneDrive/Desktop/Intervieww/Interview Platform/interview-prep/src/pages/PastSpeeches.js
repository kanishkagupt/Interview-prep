import React, { useEffect, useState } from 'react';

function PastSpeeches() {
  const [speeches, setSpeeches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/speech/all')
      .then(res => res.json())
      .then(data => setSpeeches(data))
      .catch(err => console.error('Error fetching speeches:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Past Speech Analyses</h2>
      {speeches.length === 0 ? (
        <p>No speeches found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {speeches.map((speech, index) => (
            <li key={index} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '10px'
            }}>
              <p><strong>Speech:</strong> {speech.text}</p>
              <p><strong>Clarity:</strong> {speech.clarity}</p>
              <p><strong>Fluency:</strong> {speech.fluency}</p>
              <p><strong>Confidence:</strong> {speech.confidence}</p>
              <p><em>Date:</em> {new Date(speech.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PastSpeeches;
