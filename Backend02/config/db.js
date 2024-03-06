

const mongoose = require("mongoose");
const clors = require("colors")
require("dotenv").config();

const connectDB = async ()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log("MongoDB connected successfully".magenta)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
        
    }
   
}

module.exports= connectDB;
