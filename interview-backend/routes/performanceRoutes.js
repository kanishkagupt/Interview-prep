const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Performance = require('../models/Performance');

// POST /performance — Save performance data
router.post('/', async (req, res) => {
  try {
    const { userId, mode, question, response, accuracy, hesitation, responseTime } = req.body;

    if (!userId || !mode || !question || !response) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEntry = new Performance({
      userId,
      mode,
      question,
      response,
      accuracy,
      hesitation,
      responseTime
    });

    await newEntry.save();
    console.log("Performance entry saved:", newEntry);
    res.status(201).json({ message: 'Performance saved successfully' });
  } catch (err) {
    console.error("Error saving performance:", err);
    res.status(500).json({ message: 'Error saving performance' });
  }
});

// GET /performance/:userId — Fetch performance data for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const performances = await Performance.find({ userId }).sort({ createdAt: -1 });

    console.log(`Fetched ${performances.length} performance entries for user ${userId}`);
    res.json(performances);
  } catch (err) {
    console.error("Error fetching performance data:", err);
    res.status(500).json({ message: 'Error fetching performance data' });
  }
});

module.exports = router;


