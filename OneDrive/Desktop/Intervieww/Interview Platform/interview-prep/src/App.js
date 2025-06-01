import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterviewQuestions from "./pages/InterviewQuestions";
import SpeechAnalysis from "./pages/SpeechAnalysis";
import ResumeUpload from "./pages/ResumeUpload";
import PerformanceAnalytics from "./pages/PerformanceAnalytics";
import PastSpeeches from "./pages/PastSpeeches";
import TextInterview from "./pages/TextInterview";
import DifficultySelector from "./pages/DifficultySelector";
import DiscussionForum from "./pages/DiscussionForum";
import ScheduleInterview from "./pages/ScheduleInterview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-section">
            <Link to="/">Home</Link>
            <Link to="/interview-questions">Interview Questions</Link>
            <Link to="/speech-analysis">Speech Analysis</Link>
            <Link to="/past-speeches">Past Speeches</Link>
            <Link to="/resume-upload">Resume Upload</Link>
            <Link to="/performance-analytics">Performance Analytics</Link>
            <Link to="/text-interview">Text Interview</Link>
            <Link to="/difficulty-selector">Difficulty Selector</Link>
            <Link to="/discussion-forum">Discussion Forum</Link>
            <Link to="/schedule-interview">Mock Interview</Link>
          </div>
          <div className="auth-section">
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="btn btn-primary">Signup</Link>
                <Link to="/login" className="btn btn-primary">Login</Link>
              </>
            ) : (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interview-questions" element={<InterviewQuestions />} />
        <Route path="/speech-analysis" element={<SpeechAnalysis />} />
        <Route path="/past-speeches" element={<PastSpeeches />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
        <Route path="/text-interview" element={<TextInterview />} />
        <Route path="/difficulty-selector" element={<DifficultySelector />} />
        <Route path="/discussion-forum" element={<DiscussionForum />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
















