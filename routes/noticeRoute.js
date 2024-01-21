const express = require('express');
const { loggedIn, isAdmin } = require('../middleware/auth.middleware');
const { getOpenNotice, createNotice } = require('../controllers/noticeController');

const router = express.Router();

router.post("/api/notice",loggedIn,isAdmin,createNotice);
router.get("/api/opennotice",getOpenNotice)
router.get("/api/notice",loggedIn)

module.exports = router;