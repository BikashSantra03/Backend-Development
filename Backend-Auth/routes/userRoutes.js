const { loginController, signUpController } = require("../controllers/auth");
const { auth, isAdmin, isStudent } = require("../middlewares/authMiddelware");
const userModel = require("../models/userSchema");
const express = require("express");

const router = express.Router();

//routes
router.get("/login", loginController);
router.post("/Signup", signUpController);

//testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for TESTS",
  });
});

//protected Routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Admin",
  });
});

router.get("/getEmail", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const existingUser = await userModel.findById(id); //findOne({_id:id})
    res.status(200).json({
      success: true,
      mail: existingUser.email,
      user: existingUser,
      message: "Welcome to the email route",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while fetching Email!",
    });
  }
});

module.exports = router;
