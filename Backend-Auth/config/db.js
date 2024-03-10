const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.MONGO_URL;

exports.connectDB = async (req, res) => {
  try {
    const response = await mongoose.connect(URL);

    console.log(`Mongodb Database Connection Successfull `.brightMagenta.bold);
  } catch (error) {
    console.log(`Error while accessing Mongodb Database! `.brightRed.bold);
  }
};
