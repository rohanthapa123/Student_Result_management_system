const express = require("express");
const { getAllUser, deleteUserById, register, getUserById } = require("../controllers/userController");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware")


const router = express.Router();
router.post(
  "/api/register",
  loggedIn,
  isAdmin,
  register
);
router.get("/api/users", loggedIn, isAdmin, getAllUser);
router.get("/api/users/:id", loggedIn, isAdmin, getUserById);
router.delete("/api/users/:id", loggedIn, isAdmin, deleteUserById);
module.exports = router;
