const express = require('express');
const { loggedIn,  isAdmin, isTeacherOrAdmin } = require('../middleware/auth.middleware');
const { createSection, getSectionByClass, deleteSectionById } = require('../controllers/sectionController');

const router = express.Router();


router.post("/api/section",loggedIn,isAdmin,createSection)
router.get("/api/section/:id",loggedIn,isTeacherOrAdmin,getSectionByClass)
router.delete("/api/section/:id",loggedIn,isAdmin,deleteSectionById)

module.exports = router;