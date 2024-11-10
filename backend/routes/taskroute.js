const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Task = require("../model/Task");
require("dotenv").config();

const router = express.Router();

router.post("/add", async (req, res) => {
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
      console.log("New Task added : "+newTask)
      await newTask.save();
      res.status(201).json({ task: newTask });
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  });
  
router.post('/get', async (req, res) => {
    const { userId } = req.body; 
  
    console.log("Received userId: ", userId);
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const tasks = await Task.find({ user: userId }); 
      console.log("Fetched tasks: ", tasks);
      res.json({ tasks }); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  });
  router.put('/update/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedData = req.body;
  
      console.log("Updating task with ID: ", taskId);
  
      if (!updatedData.title || !updatedData.description) {
        return res.status(400).json({ message: "Title and description are required." });
      }
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      console.log("Updated task: ", updatedTask);
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  router.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
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
    console.log(req)
    const taskId = req.params.id;
    const { status } = req.body;
    console.log("status")
    console.log(status)
    let priority = ''; 
    try {
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
  
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { 
          status: status, 
          priority: priority, 
          category: status 
        },
        { new: true } 
      );
      console.log(updatedTask)
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task status updated", task: updatedTask });
    } catch (error) {
      console.error("Error updating task status:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
module.exports = router;
