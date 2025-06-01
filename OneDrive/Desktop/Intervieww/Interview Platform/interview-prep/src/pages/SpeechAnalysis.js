import React, { useState, useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/SpeechAnalysis.css";

function SpeechAnalysis() {
  const [transcription, setTranscription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState("Please start recording to receive feedback.");
  const recognitionRef = useRef(null);

  const startRecording = () => {
    setIsRecording(true);
    setTranscription("");
    setAnalysis(null);
    setFeedback("Listening...");

    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      setIsRecording(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscription(speechText);
      analyzeSpeech(speechText);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsRecording(false);
      setFeedback("Could not detect speech. Please try again.");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const analyzeSpeech = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/api/speech/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to analyze speech");
      }

      setAnalysis({
        clarity: result.clarity,
        fluency: result.fluency,
        confidence: result.confidence,
      });

      generateFeedback(result.clarity, result.fluency, result.confidence);
    } catch (err) {
      console.error("Error analyzing speech:", err);
      setFeedback("Server error. Please try again.");
    }
  };

  const generateFeedback = (clarity, fluency, confidence) => {
    let feedbackMessage = "";

    if (clarity === "Needs Improvement") {
      feedbackMessage += "Try speaking more clearly and confidently. ";
    }
    if (fluency === "Average") {
      feedbackMessage += "Work on improving your fluency by practicing longer sentences. ";
    }
    if (confidence === "Moderate") {
      feedbackMessage += "Use more confident phrases to boost your self-assurance. ";
    }
    if (!feedbackMessage) {
      feedbackMessage = "Great job! Your speech was clear, fluent, and confident!";
    }

    setFeedback(feedbackMessage);
  };

  return (
    <div className="speech-container">
      <h1>Speech Analysis</h1>
      <p>Speak and get instant feedback on your clarity, fluency, and confidence!</p>
      <button className="record-button" onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>

      {transcription && <p className="transcription">{transcription}</p>}

      {analysis && (
        <div className="analysis-box">
          <h2>Speech Report</h2>
          <p><strong>Clarity:</strong> {analysis.clarity}</p>
          <p><strong>Fluency:</strong> {analysis.fluency}</p>
          <p><strong>Confidence:</strong> {analysis.confidence}</p>
        </div>
      )}

      <p className="feedback">{feedback}</p>

      {/* ✅ View Past Speeches Button */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/past-speeches">
          <button className="record-button">View Past Speeches</button>
        </Link>
      </div>
    </div>
  );
}

export default SpeechAnalysis;



