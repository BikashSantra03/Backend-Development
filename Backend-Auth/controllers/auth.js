const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signUpController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error while Encrypting Password",
      });
    }

    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();

    return res.status(200).send({
      success: true,
      message: " User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "User can't be registered, Please try again later!",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "PLease fill all the details carefully",
      });
    }

    let existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).send({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.role,
    };

    if (await bcrypt.compare(password, existingUser.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      existingUser = existingUser.toObject();
      existingUser.token = token;
      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure:true,
      };

      res.cookie("Token", token, options).status(200).send({
        success: true,
        token,
        existingUser,
        message: "User Logged in successfully",
      });
    } else {
      //passwsord do not match
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Login failed! Please try again later!",
    });
  }
};
