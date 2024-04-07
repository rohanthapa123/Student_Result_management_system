const express = require("express");

const router = express.Router();
const {
  loggedIn,
  isAdmin,
  isTeacherOrAdmin,
  isTeacher,
} = require("../middleware/auth.middleware");
const classController = require("../controllers/classController");
router.post("/api/class", loggedIn, isAdmin, classController.createClass);
router.patch("/api/class/edit", loggedIn, isAdmin, classController.editClass);
router.get("/api/class", loggedIn, isTeacherOrAdmin, classController.getClass);
router.get(
  "/api/class/:id",
  loggedIn,
  isTeacherOrAdmin,
  classController.getClassById
);

router.delete(
  "/api/class/:id",
  loggedIn,
  isAdmin,
  classController.deleteClassByID
);

module.exports = router;
