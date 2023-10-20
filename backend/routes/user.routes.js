const express = require('express');
const router = express.Router();

//Import user controller
const UserController = require('../controllers/user.controller');

// Define routes for user API
router.get('/api/users', UserController.getUser);
router.post('/api/users', UserController.createUser);
router.put('/api/users/:id', UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);

module.exports = router;