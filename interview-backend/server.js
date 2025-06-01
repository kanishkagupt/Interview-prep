require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("'uploads' directory created");
}


// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/certificates', express.static(path.join(__dirname, 'certificates')));

// Routes
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questionRoutes');
const speechRoutes = require('./routes/speechRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const textInterviewRoutes = require('./routes/textInterviewRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const difficultyRoutes = require('./routes/difficultyRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');


// Route usage
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/speech', speechRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/text-interview', textInterviewRoutes);
app.use('/performance', performanceRoutes);
app.use('/api/difficulty', difficultyRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/schedule', scheduleRoutes);


// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI not found in .env file");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));






