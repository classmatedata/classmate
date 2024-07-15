const express = require('express');
const router = express.Router();


const firebaseAuthController = require('./firebase-auth.js');



// Auth routes
router.post('/register', firebaseAuthController.registerUser);
router.post('/login', firebaseAuthController.loginUser);
router.post('/logout', firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);


module.exports = router;