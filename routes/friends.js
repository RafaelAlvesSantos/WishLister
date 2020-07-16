const express = require("express");
const router = express.Router();
const authMid = require("../middleware/auth");
const User = require("../models/User");

// @route   GET /api/friends
// @desc    Displays user's friends
// @access  Private
router.get("/", authMid, async (req, res) => {
  try {
    if (!req.user.friends)
      return res.status(200).send("This user does not have any friends");
    res.json(req.user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/friends
// @desc    Adds a friend to user's list
// @access  Private
router.post("/", authMid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.friends.push("5f1087457ca49318c0ccb2c2");
    await user.save();
    res.status(200).send("Friend added!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Each user will have a public page with button "SEND FRIEND REQUEST"
// That's how we will get the "user to be added" email and use it to find the ID and add it to the current user

// @route   DELETE /api/friends
// @desc    Delete a friend from the list
// @access  Private
router.delete("/", authMid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const index = user.friends.indexOf("5f1087457ca49318c0ccb2c2");
    user.friends.splice(index, 1);
    await user.save();
    res.status(200).send("Friend deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
