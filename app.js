const express = require("express");

const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

// Create task
app.post("/tasks", (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).send("Not found");
  task.completed = true;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.send("Deleted");
});

module.exports = app;
