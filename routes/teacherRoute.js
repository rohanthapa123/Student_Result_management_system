const express = require("express");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const router = express.Router();
const teacherController = require("../controllers/teacherController")
router.get("/api/teachers",loggedIn, isAdmin, teacherController.getAllTeacher);

module.exports = router;