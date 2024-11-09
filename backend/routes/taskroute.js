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
  
    const { title, description, category,  status, user, priority, deadline } = req.body;
  
    try {
      const newTask = new Task({
        title,
        description,
        category,
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
  router.put('/update/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedData = req.body;
  
      console.log("Updating task with ID: ", taskId);
  
      // Basic validation for required fields
      if (!updatedData.title || !updatedData.description) {
        return res.status(400).json({ message: "Title and description are required." });
      }
  
      // Optionally, sanitize input data here if needed
  
      // Find the task by ID and update it
      const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      console.log("Updated task: ", updatedTask);
  
      // Send back the updated task
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error.message); // Log the actual error message
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  router.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      // Find and delete the task by ID
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  
  router.patch('/:id/status', async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body; // Expecting the new status to be sent in the request body
  
    let priority = ''; // Default priority
  
    try {
      // Determine the priority based on the status
      if (status === 'Completed') {
        priority = 'Completed';
      } else if (status === 'In Progress') {
        priority = 'High';
      } else if (status === 'To Do') {
        console.log(status)
        priority = 'Low';
      } else {
        return res.status(400).json({ message: "Invalid status provided" });
      }
  
      // Find task by ID and update its status and priority
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { 
          status: status, 
          priority: priority, // Set the priority based on the status
          category: status // You can keep category same as status, or handle it differently
        },
        { new: true } // Return the updated task
      );
      console.log(updatedTask)
      // If task not found
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Return success response with the updated task
      res.status(200).json({ message: "Task status updated", task: updatedTask });
    } catch (error) {
      console.error("Error updating task status:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  // router.patch('/:id/status', async (req, res) => {
  //   const taskId = req.params.id;
  //   const { status } = req.body; // Expecting the new status to be sent in the request body
  // console.log(status)
  //   try {
  //     // Find task by ID and update its status
  //     const updatedTask = await Task.findByIdAndUpdate(
  //       taskId,
  //       { status: status, category: status  }, // Update the status field
  //       { new: true } // Return the updated task
  //     );
  // console.log(updatedTask)
  //     if (!updatedTask) {
  //       return res.status(404).json({ message: "Task not found" });
  //     }
  
  //     res.status(200).json({ message: "Task status updated", task: updatedTask });
  //   } catch (error) {
  //     console.error("Error updating task status:", error);
  //     res.status(500).json({ message: "Server error", error: error.message });
  //   }
  // });
  

module.exports = router;
