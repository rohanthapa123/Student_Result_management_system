const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const blackListService = require("../services/tokenBlackList");

let refreshTokensBlacklist = [];

exports.loggedIn = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      console.log("no token");
      return res
        .status(401)
        .json({ authenticated: false, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
      if (err) {
        console.log("Not valid");
        return res
          .status(403)
          .json({ authenticated: false, message: "Invalid token" });
      }

      const user_id = decoded.user_id; // Extract user ID from decoded token
      const [user] = await getUserById(user_id);

      if (!user) {
        return res
          .status(401)
          .json({ authenticated: false, message: "User not found" });
      }

      req.user = user[0]; // Attach user information to the request object
      console.log("req.user", req.user);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifyRefreshToken = (req, res, next) => {
  const { refreshToken } = req.cookies;
  console.log("Request.cookie" , req.cookies)
  if (refreshToken) {
    // Check if refresh token is in the blacklist
    if (blackListService.isTokenBlacklisted(refreshToken)) {
      return res.status(403).json({ message: "Refresh token revoked" });
    }

    // Verify refresh token validity
    jwt.verify(refreshToken, process.env.JWTREFRESHSECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      console.log(decoded)
      req.user=  decoded; // Attach userId to request for further processing
      next();
    });
  }else{
    return res.status(401).json({message: "Reference token missing"})
  }
};

exports.isAdmin = (req, res, next) => {
  console.log("from isAdmin", req.user);
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};

exports.isTeacher = (req, res, next) => {
  //   console.log(req.user);
  // console.log("hello");
  if (req.user && req.user.role == "teacher") {
    // console.log("Access Granted");
    next();
  } else {
    // console.log(req.user.role);
    return res.status(403).json({ message: "Permission denied" });
  }
};

exports.isStudent = (req, res, next) => {
  //   console.log(req.user);
  console.log("user", req.user);
  if (req.user && req.user.role == "student") {
    next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};
exports.isTeacherOrAdmin = (req, res, next) => {
  //   console.log(req.user);
  if (req.user && (req.user.role == "admin" || req.user.role == "teacher")) {
    next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};
