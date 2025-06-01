// routes/speechRoutes.js
const express = require('express');
const router = express.Router();
const Speech = require('../models/Speech'); // Import Speech model

// POST /api/speech/analyze - Analyze and save speech
router.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "No speech text provided" });
  }

  const wordCount = text.split(" ").length;
  const clarity = wordCount > 5 ? "Good" : "Needs Improvement";
  const fluency = wordCount > 8 ? "Fluent" : "Average";
  const confidence = text.includes("I can") || text.includes("I will") ? "High" : "Moderate";

  try {
    const newSpeech = new Speech({ text, clarity, fluency, confidence });
    await newSpeech.save();

    res.json({ clarity, fluency, confidence });
  } catch (err) {
    console.error("Error saving speech:", err.message);
    res.status(500).json({ message: "Server error while saving analysis" });
  }
});

// GET /api/speech/all - Fetch all past speeches
router.get('/all', async (req, res) => {
  try {
    const speeches = await Speech.find().sort({ createdAt: -1 });
    res.json(speeches);
  } catch (err) {
    console.error("Error fetching speeches:", err.message);
    res.status(500).json({ message: "Server error while fetching speeches" });
  }
});

module.exports = router;


