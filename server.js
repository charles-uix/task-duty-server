const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const app = express();
const connectDB = require('./config/db.js')
const taskRoute = require('./src/routes/taskRoute.js')




dotenv.config();
connectDB();



app.use(express.json());
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",            // local development
      "https://task-duty-rho.vercel.app"  // deployed frontend
    ],
    credentials: true,
  })
);

// ...rest of your server code

app.get("/", (req,res)=>{
    res.send("task manager server")
})
app.use('/api/tasks', taskRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})