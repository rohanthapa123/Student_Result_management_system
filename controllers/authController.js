const { pool } = require("../config/database");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  //   console.log(req.body);
  const { email, password } = req.body;

  try {
    const [result] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    // console.log(result);
    if (result.length === 0) {
      return res.status(402).json({ message: "Wrong Credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);
    // console.log(passwordMatch);
    if (passwordMatch === false) {
      return res.status(402).json({ message: "Wrong Password" });
    }
    const token = jwt.sign(
      { user_id: result[0].user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    const cookieOptions = {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("userRegistered", token, cookieOptions);
    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

exports.logout = (req, res, next) => {
  res.clearCookie("userRegistered");
  res.status(200).json({ message: "Logout Successful" });
};
