import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Schedule.css';

const ScheduleInterview = () => {
  const [mentorName, setMentorName] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId'); // Must be set at login

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/schedule');
      setSchedules(res.data);
    } catch (err) {
      setError('Failed to load schedules. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/schedule/create', {
        userId,
        mentorName,
        interviewDate,
        timeSlot,
      });
      setMessage(res.data.message);
      setMentorName('');
      setInterviewDate('');
      setTimeSlot('');
      fetchSchedules();
    } catch (error) {
      setMessage('Failed to schedule interview.');
    }
  };

  return (
    <div className="schedule-container">
      <h2>Schedule a Mock Interview</h2>
      <form onSubmit={handleSubmit} className="schedule-form">
        <input
          type="text"
          placeholder="Mentor Name"
          value={mentorName}
          onChange={(e) => setMentorName(e.target.value)}
          required
        />
        <input
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Time Slot (e.g., 2:00 PM - 3:00 PM)"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        />
        <button type="submit">Schedule Interview</button>
      </form>

      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading scheduled interviews...</p>}

      <h3>Scheduled Interviews</h3>
      {schedules.length === 0 && !loading ? (
        <p>No interviews scheduled yet.</p>
      ) : (
        <ul className="schedule-list">
          {schedules.map((item) => (
            <li key={item._id}>
              <strong>Mentor:</strong> {item.mentorName} |{' '}
              <strong>Email:</strong> {item.userId?.email || 'N/A'} |{' '}
              <strong>Date:</strong> {new Date(item.interviewDate).toLocaleDateString()} |{' '}
              <strong>Time:</strong> {item.timeSlot}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduleInterview;


