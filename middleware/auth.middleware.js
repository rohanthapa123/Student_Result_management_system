
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");

exports.loggedIn = async (req, res, next) => {
    //   console.log(req.cookies);
    if (!req.cookies || !req.cookies.userRegistered)
      return res.status(401).json({ message: "Unauthorized:Not Logged IN" });
    try {
      const decoded = jwt.verify(
        req.cookies.userRegistered,
        process.env.JWT_SECRET
      );
      // console.log(decoded)
      const [user] = await pool.query("SELECT * FROM user WHERE user_id = ?", [
        decoded.user_id,
      ]);
      // console.log(user[0])
      req.user = user[0];
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof jwt.JsonWebTokenError) {
        console.error("Invalid token");
        res.status(400).json({ message: "Invalid Token" });
      } else if (error instanceof jwt.TokenExpiredError) {
        console.error("Token has expired");
      } else {
        console.error("Error verifying token:", error.message);
        res.status(400).json({ message: "Error verifying token" });
      }
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    // console.log(req.user)
    if (req.user && req.user.role == "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  };
  
  exports.isTeacher = (req, res, next) => {
    //   console.log(req.user);
    if (req.user && req.user.role == "teacher") {
      next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  };
  
  exports.isStudent = (req, res, next) => {
    //   console.log(req.user);
    if (req.user && req.user.role == "student") {
      next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  };
  exports.isTeacherOrAdmin = (req, res, next) => {
    //   console.log(req.user);
    if (req.user && (req.user.role == "student" || req.user.role == 'teacher')) {
      next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  };