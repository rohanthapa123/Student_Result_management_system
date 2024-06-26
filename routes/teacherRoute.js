const express = require("express");
const {
  loggedIn,
  isAdmin,
  isTeacher,
} = require("../middleware/auth.middleware");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
router.get("/api/teachers", loggedIn, isAdmin, teacherController.getAllTeacher);
router.get(
  "/api/teachers/:id",
  loggedIn,
  isAdmin,
  teacherController.getTeacherById
);
router.get(
  "/api/getteachersubject",
  loggedIn,
  isTeacher,
  teacherController.getTeacherSubject
);
router.get(
  "/api/getteacherclass",
  loggedIn,
  isTeacher,
  teacherController.getTeacherClass
);

module.exports = router;
