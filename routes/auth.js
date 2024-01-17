const express = require("express");
const authcontroller = require("../controllers/authController");
const { loggedIn } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/api/login", authcontroller.login);

router.post("/api/logout", loggedIn, authcontroller.logout);

router.post("/api/changepassword",loggedIn, authcontroller.changePassword)

module.exports = router;
