const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  question: { type: String, required: true },
  comments: [
    {
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discussion', discussionSchema);
