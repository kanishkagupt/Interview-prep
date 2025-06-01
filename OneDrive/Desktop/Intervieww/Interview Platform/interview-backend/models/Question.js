const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  questions: [String],
});

module.exports = mongoose.model('Question', questionSchema);
