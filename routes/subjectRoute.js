const express = require("express");

const router = express.Router();
const { loggedIn, isAdmin } = require("../middleware/auth.middleware");
const subjectController = require("../controllers/subjectController");
router.post(
  "/api/subject",
  loggedIn,
  isAdmin,
  subjectController.createSubject
);
router.get("/api/subject",loggedIn,isAdmin,subjectController.getSubjects)
router.get("/api/subjectbyclass/:cid",loggedIn,isAdmin,subjectController.getSubjectByClassId);
router.get("/api/subject/:id",loggedIn,isAdmin,subjectController.getSubjectById)
router.patch("/api/subject/edit",loggedIn,isAdmin, subjectController.editSubject)
router.delete("/api/subject/:id",loggedIn,isAdmin,subjectController.deleteSubjectById)

module.exports = router;