const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { body } = require('express-validator'); 

router.post('/signup', [
    body('user_email').isEmail().normalizeEmail(), 
    body('user_password').isLength({ min: 6 }) 
], authController.signup);

router.post('/login', [
    body('user_email').isEmail().normalizeEmail(), 
    body('user_password').exists()
], authController.login); 

router.post('/logout', authController.logout);

module.exports = router;
