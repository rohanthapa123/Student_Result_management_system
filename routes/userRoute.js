const express = require("express");
const { getAllUser, deleteUserById, register } = require("../controllers/userController");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware")


const router = express.Router();
router.post(
  "/api/register",
  loggedIn,
  isAdmin,
  upload.single('image'),
  register
);
router.get("/api/users", loggedIn, isAdmin, getAllUser);
router.delete("/api/users/:id", loggedIn, isAdmin, deleteUserById);
module.exports = router;
