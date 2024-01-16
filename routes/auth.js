const express = require("express");
const authcontroller = require("../controllers/authController");

const router = express.Router();

router.post("/api/login", authcontroller.login);
router.post(
  "/api/register",
  authcontroller.loggedIn,
  authcontroller.isAdmin,
  authcontroller.register
);
router.post("/api/logout",authcontroller.loggedIn,authcontroller.logout)


module.exports = router;
