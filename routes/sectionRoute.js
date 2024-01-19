const express = require('express');
const { loggedIn, isTeacherOrAdmin, isAdmin } = require('../middleware/auth.middleware');
const { createSection } = require('../controllers/sectionController');

const router = express.Router();


router.post("/api/section",loggedIn,isAdmin,createSection)

module.exports = router;