const express = require("express");

const router = express.Router();
const {
  loggedIn,
  isAdmin,
  isTeacherOrAdmin,
} = require("../middleware/auth.middleware");
const markController = require("../controllers/marksController");
router.post("/api/mark", loggedIn, isTeacherOrAdmin, markController.insertMark);
router.get(
  "/api/mark",
  loggedIn,
  isTeacherOrAdmin,
  markController.getMarksOfStudentByExam
);
router.get(
  "/api/studentMark",
  loggedIn,
  isTeacherOrAdmin,
  markController.getMarksByClass
);
router.delete(
  "/api/mark/:id",
  loggedIn,
  isTeacherOrAdmin,
  markController.deleteMarksById
);

module.exports = router;
