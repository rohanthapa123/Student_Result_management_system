const express = require('express')
const getAllUser = require('../controllers/userController');
const { loggedIn, isAdmin } = require('../controllers/authController');

const router = express.Router();

router.get("/api/users",loggedIn,isAdmin, getAllUser);

module.exports = router;
