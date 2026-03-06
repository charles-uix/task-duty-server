const Task = require('../models/taskModel.js')

// create task
const createTask = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!tag || tag.length === 0) {
            return res.status(400).json({ message: "At least one tag is required" });
        }

        const newTask = await Task.create({
            title,
            description,
            tag
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message });
    }
};


// get all task
const getTasks =  async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

// update task
const updateTask = async (req, res) => {
    try {
        const upDatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!upDatedTask)return res.status(400).json({message : 'Task not found'});
        res.status(200).json(upDatedTask);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};

// delete task
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask)return res.status(404).json({ message : 'Task not found'});
        res.status(200).json({ message : 'Task deleted successfully'});
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
};


module.exports = { createTask, getTasks, updateTask, deleteTask};