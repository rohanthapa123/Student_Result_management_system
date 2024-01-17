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

module.exports = router;