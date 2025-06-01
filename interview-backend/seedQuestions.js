// seedQuestions.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DifficultyQuestion = require('./models/DifficultyQuestion');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
  seedQuestions();
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});

const sampleQuestions = [
  {
    role: "Frontend Developer",
    question: "What are the key differences between React and Angular?",
    difficulty: "Easy"
  },
  {
    role: "Frontend Developer",
    question: "Explain how virtual DOM works in React.",
    difficulty: "Medium"
  },
  {
    role: "Frontend Developer",
    question: "How would you optimize a large-scale React app for performance?",
    difficulty: "Hard"
  },
  {
    role: "Backend Developer",
    question: "What is RESTful API and how does it work?",
    difficulty: "Easy"
  },
  {
    role: "Backend Developer",
    question: "Explain the difference between SQL and NoSQL databases.",
    difficulty: "Medium"
  },
  {
    role: "Backend Developer",
    question: "How would you design a scalable authentication system?",
    difficulty: "Hard"
  },
  {
    role: "Full Stack Developer",
    question: "What is CORS and how do you handle it?",
    difficulty: "Easy"
  },
  {
    role: "Full Stack Developer",
    question: "How do you manage state across large full-stack applications?",
    difficulty: "Medium"
  },
  {
    role: "Full Stack Developer",
    question: "Explain Microservices architecture with pros and cons.",
    difficulty: "Hard"
  }
];

async function seedQuestions() {
  try {
    await DifficultyQuestion.deleteMany(); // Optional: clears old data
    await DifficultyQuestion.insertMany(sampleQuestions);
    console.log("✅ Sample questions seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed questions:", err);
    process.exit(1);
  }
}
