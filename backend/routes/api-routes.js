const express = require('express');
const router = express.Router();

//Import user and auth routes 
const UserRoutes = require('./user.routes');
const AuthRoutes = require('./auth.routes');

//Use the routes
router.use(UserRoutes);
router.use(AuthRoutes);

module.exports = router;

