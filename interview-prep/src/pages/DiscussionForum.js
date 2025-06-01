import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Forum.css";

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState({});

  const fetchDiscussions = async () => {
    const res = await axios.get('http://localhost:5000/api/discussions');
    setDiscussions(res.data);
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handlePostQuestion = async () => {
    if (!username || !newQuestion) return alert('Fill all fields');
    await axios.post('http://localhost:5000/api/discussions', {
      username,
      question: newQuestion
    });
    setNewQuestion('');
    fetchDiscussions();
  };

  const handleComment = async (id) => {
    if (!commentText[id] || !username) return alert('Provide username and comment');
    await axios.post(`http://localhost:5000/api/discussions/${id}/comment`, {
      username,
      text: commentText[id]
    });
    setCommentText(prev => ({ ...prev, [id]: '' }));
    fetchDiscussions();
  };

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h2>Community Discussion Forum</h2>
      </div>

      <div className="post-form">
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Ask a question or share experience..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button className="new-post-button" onClick={handlePostQuestion}>Post</button>
      </div>

      <hr />

      {discussions.map(d => (
        <div key={d._id} className="post-card">
          <p className="post-title">{d.username} asked:</p>
          <p className="post-content">{d.question}</p>

          <div className="comment-section">
            <h4>Comments:</h4>
            {d.comments.map((c, idx) => (
              <div key={idx} className="comment">
                <div className="comment-avatar"></div>
                <div className="comment-body">
                  <p className="comment-author">{c.username}</p>
                  <p className="comment-text">{c.text}</p>
                </div>
              </div>
            ))}
            <div className="reply-form">
              <textarea
                placeholder="Write a comment..."
                value={commentText[d._id] || ''}
                onChange={(e) => setCommentText(prev => ({ ...prev, [d._id]: e.target.value }))}
              />
              <button onClick={() => handleComment(d._id)}>Add Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionForum;
