const Task = require("../models/taskModel.js");

// Create task
// controllers/noteController.js
import Note from "../models/Note.js"; // your Note model

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!content) return res.status(400).json({ message: "Content is required" });

    // Create the note linked to the logged-in user
    const newNote = await Note.create({
      title,
      content,
      user: req.user._id, // assumes authentication middleware sets req.user
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task (only if it belongs to the user)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task)
      return res.status(404).json({ message: "Task not found or not yours" });

    Object.assign(task, req.body); // Update fields
    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task (only if it belongs to the user)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task)
      return res.status(404).json({ message: "Task not found or not yours" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
