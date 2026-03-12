const Task = require("../models/taskModel.js");

// Create task
const createTask = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });
    if (!tag || tag.length === 0)
      return res.status(400).json({ message: "At least one tag is required" });

    const newTask = await Task.create({
      title,
      description,
      tag,
      user: req.user._id, // Link task to logged-in user
    });

    res.status(201).json(newTask);
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
