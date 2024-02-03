const express = require('express');
const { loggedIn,  isAdmin } = require('../middleware/auth.middleware');
const { createSection, getSectionByClass, deleteSectionById } = require('../controllers/sectionController');

const router = express.Router();


router.post("/api/section",loggedIn,isAdmin,createSection)
router.get("/api/section/:id",loggedIn,isAdmin,getSectionByClass)
router.delete("/api/section/:id",loggedIn,isAdmin,deleteSectionById)

module.exports = router;