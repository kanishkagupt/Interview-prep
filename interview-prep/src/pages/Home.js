import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Your Ultimate Interview Preparation Platform</h1>
        <p>Master your interviews with AI-driven practice, speech analysis, and performance tracking.</p>
        <button className="get-started" onClick={() => navigate("/interview-questions")}>
          Get Started
        </button>
      </header>
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI-Powered Questions</h3>
            <p>Get dynamic, role-specific interview questions.</p>
          </div>
          <div className="feature-card">
            <h3>Speech Analysis</h3>
            <p>Improve clarity and confidence with real-time feedback.</p>
          </div>
          <div className="feature-card">
            <h3>Resume Insights</h3>
            <p>Upload your resume and receive expert suggestions.</p>
          </div>
          <div className="feature-card">
            <h3>Mock Interviews</h3>
            <p>Practice with video recordings and track improvements.</p>
          </div>
          <div className="feature-card">
            <h3>Performance Analytics</h3>
            <p>Get detailed reports to refine your skills.</p>
          </div>
        </div>
      </section>
      <footer className="home-footer">
        <p>&copy; 2025 Interview Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Home;
