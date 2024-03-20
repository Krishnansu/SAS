const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Import your authentication middleware
const userController = require('../controllers/userController');

router.get('/me', authMiddleware, userController.getCurrentUserDetails); 

module.exports = router;
