const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request body

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todo_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Define Task schema
const taskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text });
  await newTask.save();
  res.json(newTask);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ success: true });
});

// Demo route from before
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend server!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
