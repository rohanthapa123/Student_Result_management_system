const express = require('express');
const { loggedIn, isTeacherOrAdmin, isAdmin } = require('../middleware/auth.middleware');
const { createSection, getSectionByClass } = require('../controllers/sectionController');

const router = express.Router();


router.post("/api/section",loggedIn,isAdmin,createSection)
router.get("/api/section/:id",loggedIn,isAdmin,getSectionByClass)

module.exports = router;