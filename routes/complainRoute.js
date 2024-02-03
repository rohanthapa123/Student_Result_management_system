const express = require("express");
const { loggedIn, isAdmin, isStudent } = require("../middleware/auth.middleware");
const { createComplain, deleteComplain, getComplain, getMyComplain, solveComplain } = require("../controllers/complainController");


const router = express.Router();

router.post("/api/complain", loggedIn, isStudent, createComplain);
router.delete("/api/complain/:id", loggedIn, isAdmin, deleteComplain);
router.get("/api/complain", loggedIn ,isAdmin, getComplain);
router.get("/api/mycomplain", loggedIn ,isStudent, getMyComplain);
router.put('/api/complain/:id',loggedIn,isAdmin,solveComplain)

module.exports = router;
