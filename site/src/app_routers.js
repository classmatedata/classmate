const express = require('express');
const router = express.Router();
const verifyToken = require('./app_middleware.js');

const firebaseAuthController = require('./controller_firebase-auth.js');
// const ClassMateDataController = require('./controller_classmatedata.js');


// Auth routes
router.post('/register', firebaseAuthController.registerUser);
router.post('/login', firebaseAuthController.loginUser);
router.post('/logout', firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);

// //posts routes
// router.get('/api/courses', verifyToken, ClassMateDataController.getCourses);

module.exports = router;