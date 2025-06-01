const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');

// Get all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new discussion
router.post('/', async (req, res) => {
  const { username, question } = req.body;
  try {
    const newDiscussion = new Discussion({ username, question });
    const saved = await newDiscussion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a comment to a discussion
router.post('/:id/comment', async (req, res) => {
  const { username, text } = req.body;
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

    discussion.comments.push({ username, text });
    const updated = await discussion.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
