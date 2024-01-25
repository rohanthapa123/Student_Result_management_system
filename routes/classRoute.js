const express = require("express");

const router = express.Router();
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const classController = require("../controllers/classController");
router.post(
  "/api/class",
  loggedIn,
  isAdmin,
  classController.createClass
);
router.get("/api/class",loggedIn,isAdmin,classController.getClass)

module.exports = router;