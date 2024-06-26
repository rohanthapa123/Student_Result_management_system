const express = require("express");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get(
  "/api/students",
  loggedIn,
  isAdmin,
  studentController.getAllStudents
);
router.get(
  "/api/students/:id",
  loggedIn,
  isAdmin,
  studentController.getStudentById
);
router.get(
  "/api/getnextrollno/:id",
  loggedIn,
  isAdmin,
  studentController.getNextRollNo
);

module.exports = router;
