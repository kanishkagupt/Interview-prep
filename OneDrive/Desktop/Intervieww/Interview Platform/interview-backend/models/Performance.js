const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mode: String,
  question: String,
  response: String,
  accuracy: Number,
  hesitation: Number,
  responseTime: Number
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);

