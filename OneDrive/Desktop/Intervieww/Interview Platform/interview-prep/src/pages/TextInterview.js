import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TextInterview.css";

const sampleQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want to work for our company?",
  "Describe a challenge you’ve faced and how you handled it.",
  "Where do you see yourself in 5 years?"
];

function TextInterview() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (questionIndex === 0) {
      const firstQuestion = sampleQuestions[0];
      setChat([{ type: "bot", text: firstQuestion }]);
      setStartTime(Date.now());
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const responseTime = ((Date.now() - startTime) / 1000).toFixed(2); // in seconds
    const currentQuestion = chat[chat.length - 1]?.text || "";

    const newChat = [...chat, { type: "user", text: input }];

    // Save user answer to DB
    try {
      await axios.post("http://localhost:5000/api/text-interview/save", {
        userId,
        question: currentQuestion,
        answer: input
      });
    } catch (error) {
      console.error("Error saving response:", error.message);
    }

    // Save performance data to DB
    try {
      await axios.post("http://localhost:5000/performance", {
        userId,
        mode: "Text Interview",
        question: currentQuestion,
        response: input,
        accuracy: Math.floor(Math.random() * 21) + 80, // 80–100
        hesitation: Math.floor(Math.random() * 6),     // 0–5
        responseTime: parseFloat(responseTime)         // seconds
      });
    } catch (error) {
      console.error("Error saving performance:", error.message);
    }

    const nextQuestionIndex = questionIndex + 1;
    const nextQuestion = sampleQuestions[nextQuestionIndex];

    if (nextQuestion) {
      newChat.push({ type: "bot", text: nextQuestion });
      setStartTime(Date.now()); // reset timer for next question
    }

    setChat(newChat);
    setInput("");
    setQuestionIndex(nextQuestionIndex);
  };

  return (
    <div className="text-interview-container">
      <h2>Text-Based Interview</h2>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Type your answer..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default TextInterview;





