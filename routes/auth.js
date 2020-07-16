const express = require("express");
const router = express.Router();
const authMid = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

// @route   GET /api/auth
// @desc    Get currently logged in user
// @access  Private
router.get("/", authMid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/auth
// @desc    Logs the user in
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // ADD FIELD VALIDATION LATER
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password");

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(404).send("User not found");
  }
});

// To add user to friends list
// const userToAdd = await User.findOne({ email: "rafael@gmail.com" });
// user.friends.push(userToAdd);

module.exports = router;
