const express = require("express");
const app = express();
const colors = require("colors");

//Body-parser is a popular middleware used in Node.js applications to simplify handling incoming request bodies. It acts as a bridge between the raw data sent in a request and the user-friendly JavaScript object your application can work with.
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server running at PORT 3000".bgGreen);
});

app.get("/", (req, res) => {
  res.send("Hi how are Bikash!");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  res.send("Post request submitted successfully!");
});

// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://0.0.0.0:27017/myDatabase")
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.log(err));

const connetDB = async () => {
  try {
    // Mongoose is a popular Object Data Modeling (ODM) library for Node.js that simplifies interacting with MongoDB, a NoSQL document database. It acts as a bridge between the object-oriented nature of JavaScript and the document-oriented structure of MongoDB.
    const mongoose = require("mongoose");
    await mongoose.connect("mongodb://0.0.0.0:27017/myDatabase");
    console.log(`Conected to MongoDB database`.bgMagenta);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};

