const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');

// GET /api/users - Get a list of users
// router.get('/', async (req, res) => {
//     const { name, email } = req.query;
//     try {
//         // Use the UserService to fetch users
//         const users = await UserService.getUsers({ name, email });

//         // Send the list of users as a JSON response
//         res.status(200).json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// POST create user
router.post('/', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if all required fields are provided
        const requiredFields = [email, password, name];
        if (!requiredFields.every(Boolean)) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Check if a user with the provided email already exists
        const existingUser = await UserService.getUser(email);

        // If a user with the same email is found, respond with an error
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Create a new user using the UserService
        const newUser = await UserService.createUser(email, password, name);

        // Remove sensitive information like password before sending the response
        delete newUser.password;

        // Respond with a success message and the newly created user
        res.status(201).json({ data: newUser, msg: 'User created successfully' });
    } catch (error) {
        console.error(`Unable to create user: ${email}`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
