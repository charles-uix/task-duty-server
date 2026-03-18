// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require("cors")
// const app = express();
// const connectDB = require('./config/db.js')
// const taskRoute = require('./src/routes/taskRoute.js')

// dotenv.config();
// connectDB();

// app.use(express.json());

// app.use(cors());

// app.get("/", (req,res)=>{
//     res.send("task manager server")
// })
// app.use('/api/tasks', taskRoute)

// const port = process.env.PORT
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`)
// })

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const connectDB = require("./config/db.js");
const taskRoute = require("./src/routes/taskRoute.js");
const userRoute = require("./src/routes/userRoutes.js");
const noteRoute = require("./src/routes/noteRoute.js");

dotenv.config();
connectDB();

// Allow your frontend domain
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("task manager server");
});

app.use("/api/tasks", taskRoute);
app.use("/api/user/auth", userRoute);
app.use("/api/notes/", noteRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
