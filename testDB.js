const { createTask } = require("./src/conttollers/taskController")
const mongoose = require("mongoose");

const testDb = async () => {
  try {
    // Connect to MongoDB first
    await mongoose.connect("mongodb://localhost:27017/taskmanager");
    console.log("✅ Connected to MongoDB");

    // Mock req and res
    const req = { body: { title: "Test Task", description: "Test Description", tag: "important" } };
    const res = {
      status: (code) => ({
        json: (data) => console.log("Response:", code, data),
      }),
    };

    await createTask(req, res);

    // Close connection when done
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error creating task:", err);
  }
};

testDb();




