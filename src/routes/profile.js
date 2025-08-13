const express = require("express");
const profileRouter = express.Router();
const User = require("../models/User");
const { userAuth } = require("../middleware/auth");

// GET /profile (Protected)
profileRouter.get("/", userAuth, async (req, res) => {
  try {
    const user = req.user; // userAuth middleware should set this
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = profileRouter;
