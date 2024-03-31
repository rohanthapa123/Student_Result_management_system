const express = require('express');
const { loggedIn,  isAdmin, isTeacherOrAdmin } = require('../middleware/auth.middleware');
const { createSection, getSectionByClass, deleteSectionById,  getSectionById, updateSection, getSections } = require('../controllers/sectionController');

const router = express.Router();


router.post("/api/section",loggedIn,isAdmin,createSection)
router.patch("/api/section/edit",loggedIn,isAdmin,updateSection)
router.get("/api/sectionbyclass/:id",loggedIn,isTeacherOrAdmin,getSectionByClass)
router.get("/api/section/:id",loggedIn,isTeacherOrAdmin,getSectionById)
router.get("/api/section/",loggedIn,isTeacherOrAdmin,getSections)
router.delete("/api/section/:id",loggedIn,isAdmin,deleteSectionById)

module.exports = router;