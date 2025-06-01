const mongoose = require("mongoose");

const DifficultyQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  }
});

module.exports = mongoose.model("DifficultyQuestion", DifficultyQuestionSchema);
