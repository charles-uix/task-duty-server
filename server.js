const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const app = express();
const connectDB = require('./config/db.js')
const taskRoute = require('./src/routes/taskRoute.js')




dotenv.config();
connectDB();



app.use(express.json());

app.use(cors({
  origin: "https://task-duty-65i9.vercel.app/"
}));

app.get("/", (req,res)=>{
    res.send("task manager server")
})
app.use('/api/tasks', taskRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})