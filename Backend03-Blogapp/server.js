const express = require("express");
require("colors");
const { connectDB } = require("./config/db.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

const blogRoutes = require("./routes/blogRoutes.js");

app.use("/api/v1/", blogRoutes);


//default route'
app.get("/", (req, res) => {
  res.send(`<h1>This is home Page</h1>`);
});
app.listen(PORT, (req, res) => {
  console.log(`Server Running at PORT Number ${PORT} `.blue.bold);
});
connectDB();
