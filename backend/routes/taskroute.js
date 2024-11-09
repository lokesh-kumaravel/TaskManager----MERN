const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Task = require("../model/Task");
require("dotenv").config();

const router = express.Router();

// Add new task
router.post("/add", async (req, res) => {
    console.log("Received request body:", req.body);  // Log request body to verify
  
    const { title, description, category, duration, status, user, priority, deadline } = req.body;
  
    try {
      const newTask = new Task({
        title,
        description,
        category,
        duration,
        status,
        user,
        priority,
         deadline
      });
  
      await newTask.save();
      res.status(201).json({ task: newTask });
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  });
  
router.post('/get', async (req, res) => {
    const { userId } = req.body; // Access userId from the body
  
    console.log("Received userId: ", userId);
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const tasks = await Task.find({ user: userId }); // Find tasks based on userId
      console.log("Fetched tasks: ", tasks);
      res.json({ tasks }); // Send tasks as a response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  });
  

module.exports = router;
