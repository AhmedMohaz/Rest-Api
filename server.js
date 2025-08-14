// ----------------------
// 1. Import dependencies
// ----------------------
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load variables from .env

// Import User model
const User = require("./User"); // No folders, same directory

// ----------------------
// 2. Create Express app
// ----------------------
const app = express();
app.use(express.json()); // Parse JSON bodies

// ----------------------
// 3. Connect to MongoDB
// ----------------------
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------
// 4. Routes
// ----------------------

// GET: Return all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // ID from URL
      req.body, // Updated data
      { new: true, runValidators: true } // Return updated doc & validate
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ----------------------
// 5. Start the server
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
