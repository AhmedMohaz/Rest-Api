
// ----------------------
// 1. Import mongoose
// ----------------------
const mongoose = require("mongoose");

// ----------------------
// 2. Create the User Schema
// ----------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required string field
  email: { type: String, required: true, unique: true }, // Unique email
  age: Number, // Optional number
  date: { type: Date, default: Date.now } // Default date
});

// ----------------------
// 3. Export the User model
// ----------------------
module.exports = mongoose.model("User", userSchema);
