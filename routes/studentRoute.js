const express = require("express");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get("/api/students",loggedIn,isAdmin,studentController.getAllStudents)

module.exports = router;