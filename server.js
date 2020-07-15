const express = require("express");
const connectDB = require("./config/db");
app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
