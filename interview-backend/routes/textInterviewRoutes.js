const express = require('express');
const router = express.Router();
const TextResponse = require('../models/TextResponse');

// Save text interview response
router.post('/save', async (req, res) => {
  const { userId, question, answer } = req.body;

  if (!userId || !question || !answer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newResponse = new TextResponse({ userId, question, answer });
    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error saving response:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Optional: Fetch all responses by user
router.get('/responses/:userId', async (req, res) => {
  try {
    const responses = await TextResponse.find({ userId: req.params.userId });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching responses" });
  }
});

module.exports = router;



