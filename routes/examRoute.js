const express = require("express");

const router = express.Router();
const {
  loggedIn,
  isAdmin,
  isTeacher,
  isTeacherOrAdmin,
  isStudent,
} = require("../middleware/auth.middleware");
const examController = require("../controllers/examController");
router.post("/api/exam", loggedIn, isAdmin, examController.createExam);
router.get("/api/exam", loggedIn, isTeacherOrAdmin, examController.getExams);
router.get("/api/exam/:id", loggedIn, isTeacherOrAdmin, examController.getExamById);
router.patch("/api/exam/edit", loggedIn, isTeacherOrAdmin, examController.updateExam)
router.get(
  "/api/examforteacher",
  loggedIn,
  isTeacher,
  examController.getExamOfTeacherClass
);
router.get(
  "/api/terms",
  loggedIn,
  isStudent,
  examController.getTerms
);
router.delete(
  "/api/exam/:id",
  loggedIn,
  isAdmin,
  examController.deleteExamById
);

module.exports = router;
