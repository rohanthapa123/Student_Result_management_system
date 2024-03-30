const express = require("express");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/api/admins",loggedIn,isAdmin,adminController.getAllAdmins)
router.get("/api/admin/:id",loggedIn,isAdmin,adminController.getAdminById)

module.exports = router;