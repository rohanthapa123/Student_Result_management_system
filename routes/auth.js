const express = require("express");
const authcontroller = require("../controllers/authController");
const { loggedIn, isAdmin, isTeacher, isStudent } = require("../middleware/auth.middleware");
const routePermissionController = require('../controllers/routePermissionController')
const router = express.Router();

router.post("/api/login", authcontroller.login);

router.post("/api/logout",  authcontroller.logout);

router.post("/api/changepassword",loggedIn, authcontroller.changePassword)

router.get("/api/check-auth",loggedIn,routePermissionController.isAuthenticated);
router.get("/api/isAdmin",loggedIn,isAdmin, routePermissionController.isAuthenticated);
router.get("/api/isTeacher",loggedIn,isTeacher,routePermissionController.isAuthenticated);
router.get("/api/isStudent",loggedIn,isStudent,routePermissionController.isAuthenticated);
module.exports = router;
