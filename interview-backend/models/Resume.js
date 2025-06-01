const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  filename: String,
  extractedText: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", ResumeSchema);
