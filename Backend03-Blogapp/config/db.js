
const mongoose = require("mongoose");
const colors = require("colors")
require("dotenv").config();


exports.connectDB = async (req,res)=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Mongodb Database Connection Successfull `.bgMagenta.bold)

    } catch (error) {
        console.log(`Error while accessing Mongodb Database! `.bgRed.bold)
        
    }
}
