const express = require("express");

const router = express.Router();
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const examController = require("../controllers/examController");
router.post(
  "/api/exam",
  loggedIn,
  isAdmin,
  examController.createExam
);
router.get("/api/exam",loggedIn,isAdmin,examController.getExams)
router.delete("/api/exam/:id",loggedIn,isAdmin,examController.deleteExamById)

module.exports = router;