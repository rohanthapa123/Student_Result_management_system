const express = require("express");
const { getAllUser, deleteUserById } = require("../controllers/userController");
const { loggedIn, isAdmin } = require("../controllers/authController");

const router = express.Router();

router.get("/api/users", loggedIn, isAdmin, getAllUser);
router.delete("/api/users/:id", loggedIn, isAdmin, deleteUserById);
module.exports = router;
