const express = require("express");
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const {
  getOpenNotice,
  createNotice,
  getNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const router = express.Router();

router.post("/api/notice", loggedIn, isAdmin, createNotice);
router.delete("/api/notice/:id", loggedIn, isAdmin, deleteNotice);
router.get("/api/opennotice", getOpenNotice);
router.get("/api/notice", loggedIn, getNotice);

module.exports = router;
