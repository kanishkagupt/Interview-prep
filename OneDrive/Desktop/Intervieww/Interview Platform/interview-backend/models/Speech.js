const mongoose = require('mongoose');

const speechSchema = new mongoose.Schema({
  text: { type: String, required: true },
  clarity: String,
  fluency: String,
  confidence: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional if using auth
});

module.exports = mongoose.model('Speech', speechSchema);
