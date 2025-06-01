const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questionData = [
  {
    role: "Software Engineer",
    questions: [
      "Explain the concept of closures in JavaScript?",
      "What are the key differences between SQL and NoSQL databases?",
      "How does React handle state management?"
    ]
  },
  {
    role: "Data Analyst",
    questions: [
      "What is data normalization and why is it important?",
      "Explain the difference between supervised and unsupervised learning?",
      "How do you handle missing data in a dataset?"
    ]
  },
  {
    role: "Product Manager",
    questions: [
      "How do you prioritize tasks in a product roadmap?",
      "What frameworks do you use for product decision-making?",
      "How do you handle stakeholder conflicts in a project?"
    ]
  },
  {
    role: "UX Designer",
    questions: [
      "What are the key principles of UX design?",
      "How do you conduct user research?",
      "Explain the importance of accessibility in design."
    ]
  },
  {
    role: "Marketing Specialist",
    questions: [
      "What is A/B testing and how is it used in marketing?",
      "Explain the role of SEO in digital marketing.",
      "How do you measure the success of a marketing campaign?"
    ]
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("MongoDB connected");

  // Clear previous data (optional)
  await Question.deleteMany();

  // Insert new data
  await Question.insertMany(questionData);
  console.log("Questions inserted successfully");

  mongoose.disconnect();
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});
