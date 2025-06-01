const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Create a schedule
router.post('/create', async (req, res) => {
  try {
    const { userId, mentorName, interviewDate, timeSlot } = req.body;
    const newSchedule = new Schedule({ userId, mentorName, interviewDate, timeSlot });
    await newSchedule.save();
    res.status(201).json({ message: 'Interview scheduled successfully', newSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule interview', error });
  }
});

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('userId', 'email');
    res.status(200).json(schedules);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch schedules.' });
  }
});

module.exports = router;

