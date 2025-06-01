const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST /api/questions - Add new role + questions manually
router.post('/', async (req, res) => {
  const { role, questions } = req.body;
  try {
    const existing = await Question.findOne({ role });
    if (existing) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newEntry = new Question({ role, questions });
    await newEntry.save();
    res.status(201).json({ message: "Questions added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/questions/:role - Get predefined questions
router.get('/:role', async (req, res) => {
  const { role } = req.params;
  try {
    const data = await Question.findOne({ role });
    if (!data) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(data.questions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


