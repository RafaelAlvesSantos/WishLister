const express = require("express");
const connectDB = require("./config/db");
app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
