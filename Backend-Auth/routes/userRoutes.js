
const {loginController,signUpController} = require("../controllers/auth")
const{auth,isAdmin,isStudent}= require("../middlewares/authMiddelware")
const express = require("express")

const router = express.Router();

//routes

router.get("/login",loginController)
router.post("/Signup",signUpController)




//testing protected routes for single middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});



//protected Routes
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
    });
} );

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});


module.exports= router;