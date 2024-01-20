const { getUserById } = require("../models/userModel");

exports.loggedIn = async (req, res, next) => {
  console.log("session",req.session);
  try {
    if (req.session && req.session.user_id) {
      const user_id = req.session.user_id;
      const [user] = await getUserById(user_id);
      req.user = user[0];
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
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
  if (req.user && (req.user.role == "student" || req.user.role == "teacher")) {
    next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};
