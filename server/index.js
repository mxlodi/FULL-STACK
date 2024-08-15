const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/userModel");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGODB_URI).then().catch();

// CRUD
// 1) Create method
app.post("/api/v1/users", async (req, res) => {
  try {
    // Get data from body
    const user = await User.create(req.body);
    // Send response
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// 2) Read method
app.get("/api/v1/users", async (req, res) => {
  try {
    // Get data from body
    const users = await User.find();
    // Send response
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

// Get by ID
app.get("/api/v1/users/:id", async (req, res) => {
  try {
    // Get data from body
    const user = await User.findById(req.params.id);
    // Send response
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// 3) Update method
app.patch("/api/v1/users/:id", async (req, res) => {
  try {
    // Get data from body
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // Send response
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// 4) Delete method
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    // Get data from body
    const user = await User.findByIdAndDelete(req.params.id);
    // Send response
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 3001;
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
