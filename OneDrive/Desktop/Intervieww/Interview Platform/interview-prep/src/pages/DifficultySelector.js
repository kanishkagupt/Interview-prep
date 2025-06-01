import React, { useState } from "react";
import axios from "axios";
import "../styles/DifficultySelector.css";

function DifficultySelector() {
  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);

  const handleFetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/difficulty?role=${encodeURIComponent(role)}&difficulty=${encodeURIComponent(difficulty)}`
      );
      setQuestions(res.data || []);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  return (
    <div className="difficulty-container">
      <h2>Select Role and Difficulty Level</h2>

      <div className="selectors">
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
        </select>

        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button onClick={handleFetchQuestions}>Fetch Questions</button>
      </div>

      <div className="question-list">
        {questions.length > 0 && (
          <>
            <h3>
              {role} - {difficulty} Questions
            </h3>
            <ul>
              {questions.map((q, index) => (
                <li key={index}>{q.question}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default DifficultySelector;

