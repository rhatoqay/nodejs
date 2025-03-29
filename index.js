const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Ensure this points to your db.js file

const app = express();

// Middleware to allow cross-origin requests and JSON body parsing
app.use(cors());
app.use(express.json());

// Create a todo item
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Retrieve all todo items
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Retrieve a specific todo item by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update a todo item by ID
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
    res.json({ message: "Todo updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete a todo item by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000");
});