const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db.js");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8080;

//middleware to parse json request body
app.use(express.json());

const todoRoutes = require("./routes/todoRoutes.js");

//mount the todo API routes
app.use("/api/v1/", todoRoutes);

//default route
app.get("/", (req, res) => {
  res.send(`<h1>This is HomePage</h1>`);
});

//start server
app.listen(PORT, () => {
  console.log(`Server Running at PORT ${PORT} `.blue);
});
connectDB();