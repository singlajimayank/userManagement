const UserService = require('../services/users.service');

// GET  Get a list of users
exports.getUser = async (req, res) => {
    const { name, email } = req.query;
    try {
        // Use the UserService to fetch users
        const filteredUsers = await UserService.getFilteredUsers(name, email);

        // Send the list of users as a JSON response
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST create user
exports.createUser = async (req, res) => {
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
};

exports.updateUser = async (req, res) => {
    const userIdToUpdate = parseInt(req.params.id, 10);
    const updatedData = req.body;
    try {
        const updatedUser = await UserService.updateUser(userIdToUpdate, updatedData);
        if (updatedUser === null) {
            return res.status(404).json({ error: 'User not found' });
        }
        delete updatedUser.password;
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    const userIdToDelete = parseInt(req.params.id, 10);
    try {
        const deletedUser = await UserService.deleteUser(userIdToDelete);
        if (deletedUser === null) {
            return res.status(404).json({ error: 'User not find' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

