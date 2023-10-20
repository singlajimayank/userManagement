const express = require('express');
const router = express.Router();

//Import auth controller
const AuthController = require('../controllers/auth.controller');

//Define routes for auth API
router.post('/auth/login', AuthController.login);

module.exports = router;