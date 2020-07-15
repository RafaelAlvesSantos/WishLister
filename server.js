const express = require("express");
const connectDB = require("./config/db");
app = express();

app.use(express.json({ extended: false }));
