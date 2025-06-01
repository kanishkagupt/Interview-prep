import React, { useState } from "react";
import "../styles/InterviewQuestions.css";
import axios from "axios";

function InterviewQuestions() {
  const [selectedRole, setSelectedRole] = useState("");
  const [questions, setQuestions] = useState([]);

  const roles = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "UX Designer",
    "Marketing Specialist"
  ];

  const generateQuestions = async () => {
    if (!selectedRole) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/questions/${selectedRole}`);
      setQuestions(res.data);
    } catch (err) {
      alert("Error fetching questions. Please try again.");
      setQuestions([]);
    }
  };

  return (
    <div className="questions-container">
      <h1>Select Your Job Role</h1>
      <div className="input-container">
        <select onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button className="generate-button" onClick={generateQuestions}>
          Generate Questions
        </button>
      </div>

      <div className="questions-list">
        {questions.length > 0 && (
          <div>
            <h2>Interview Questions for {selectedRole}</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewQuestions;



