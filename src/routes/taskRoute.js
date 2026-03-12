const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../conttollers/taskController.js");

const protected = require("../Middleware/authMiddleware.js");

router.post("/", protected, createTask);
router.get("/", protected, getTasks);
router.put("/:id", protected, updateTask);
router.delete("/:id", protected, deleteTask);

module.exports = router;
