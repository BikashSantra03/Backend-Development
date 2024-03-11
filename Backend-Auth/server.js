const express = require("express");
const cookieParser = require("cookie-parser");
require("colors");

require("dotenv").config();

const { connectDB } = require("./config/db");

const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 8000;

//mounting
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>This is Homepage</h1>");
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`.brightBlue.bold);
});

connectDB();
