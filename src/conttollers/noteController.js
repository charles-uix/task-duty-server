const Note = require("../models/noteModel.js");

// Create note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!content)
      return res.status(400).json({ message: "Content is required" });

    // Create note
    const newNote = await Note.create({
      title,
      content,
      user: req.user._id, // Link note to logged-in user
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all notes for logged-in user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });

    Object.assign(note, req.body);
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };