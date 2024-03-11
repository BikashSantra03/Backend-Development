const jwt = require("jsonwebtoken");
require("colors");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    console.log("Cookie:".bgBrightYellow, req.cookies?.Token);
    console.log("Body:".bgBrightCyan, req.body?.token);
    console.log("Header:".bgBrightGreen, req.header("Authorization"));
    const token =
      req.cookies?.Token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.body?.token;

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);

      req.user = payload; // very important. It adds payload (user info) in request object. Now we can fetch user details from request body from anywhere
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
      error: error.message,
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};
