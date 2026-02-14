const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
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
router.get("/me", auth, async (req, res) => {
  try {
    // req.user is the ID decoded from the token by the middleware [cite: 782]
    const user = await User.findById(req.user).select("-password"); // Don't send the password back
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
