const express = require('express');
const router = express.Router();


const firebaseAuthController = require('../controller/controller_auth_firebase');



// Auth routes
router.post('/register', firebaseAuthController.registerUser);
router.post('/login', firebaseAuthController.loginUser);
router.post('/logout', firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);


module.exports = router;