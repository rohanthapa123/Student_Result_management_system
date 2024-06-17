const express = require("express");

const router = express.Router();
const {
  loggedIn,
  isAdmin,
  isTeacherOrAdmin,
  isStudent,
} = require("../middleware/auth.middleware");
const markController = require("../controllers/marksController");
router.post("/api/mark", loggedIn, isTeacherOrAdmin, markController.insertMark);
router.get(
  "/api/result/:term",
  loggedIn,
  isStudent,
  markController.getResult
);
router.get(
  "/api/terminalMarks/:term",
  loggedIn,
  isStudent,
  markController.getTerminalMarks
);
router.get(
  "/api/allterminalmarks",
  loggedIn,
  isStudent,
  markController.getallterminalmarks
);
router.get(
  "/api/studentMark/",
  loggedIn,
  isTeacherOrAdmin,
  markController.getMarksByClass
);
router.get(
  "/api/viewMark/",
  loggedIn,
  isAdmin,
  markController.getAllMarksByClass
);
router.post(
  "/api/insertMarks",
  loggedIn,
  isTeacherOrAdmin,
  markController.insertMark
);
router.delete(
  "/api/mark/:id",
  loggedIn,
  isTeacherOrAdmin,
  markController.deleteMarksById
);

module.exports = router;
