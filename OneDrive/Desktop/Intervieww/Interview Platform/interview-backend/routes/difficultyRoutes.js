const express = require("express");
const router = express.Router();
const DifficultyQuestion = require("../models/DifficultyQuestion");

// Fetch questions based on role and difficulty
router.get("/", async (req, res) => {
  const { role, difficulty } = req.query;

  if (!role || !difficulty) {
    return res.status(400).json({ message: "Role and difficulty are required." });
  }

  try {
    const questions = await DifficultyQuestion.aggregate([
      { $match: { role, difficulty } },
      { $sample: { size: 5 } } // Return 5 random questions
    ]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

module.exports = router;
