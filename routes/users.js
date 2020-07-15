const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

// @route   POST /api/users
// @desc    Registers a user
// @access  Public
router.post("/", async (req, res) => {
  // ADD VALIDATION LATER
  const { name, email, password, birthDate } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password, birthDate });
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hash(password, salt);
    await user.save();

    // Log in user after creation
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
        res.status(200).json(token);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
