const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json({ token: generateToken(user._id),name: user.name });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await user.matchPassword(req.body.password)) {
    res.json({ token: generateToken(user._id),name: user.name });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
