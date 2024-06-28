const express = require("express");
const authcontroller = require("../controllers/authController");
const {
  loggedIn,
  isAdmin,
  isTeacher,
  isStudent,
  verifyRefreshToken,
} = require("../middleware/auth.middleware");
const routePermissionController = require("../controllers/routePermissionController");
const router = express.Router();

router.post("/api/login", authcontroller.login);

router.post("/api/logout", authcontroller.logout);

router.post("/api/changepassword", loggedIn, authcontroller.changePassword);
router.post(
  "/api/resetpassword",
  loggedIn,
  isAdmin,
  authcontroller.resetPassword
);

router.post('/api/refresh-token' , verifyRefreshToken , authcontroller.newReferenceToken)

router.get(
  "/api/check-auth",
  loggedIn,
  verifyRefreshToken,
  routePermissionController.isAuthenticated
);
router.get(
  "/api/isAdmin",
  loggedIn,
  isAdmin,
  routePermissionController.isAuthenticated
);
router.get(
  "/api/isTeacher",
  loggedIn,
  isTeacher,
  routePermissionController.isAuthenticated
);
router.get(
  "/api/isStudent",
  loggedIn,
  isStudent,
  routePermissionController.isAuthenticated
);
module.exports = router;
