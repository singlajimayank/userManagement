const UserService = require('../services/users.service');

// GET  Get a list of users
exports.getUser = async (req, res) => {
    const { email, name, sorting } = req.query;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;

    try {
        const filteredUsers = await UserService.getFilteredUsers({ email, name, page, limit, sorting });

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
        const { newUser, count } = await UserService.createUser(email, password, name);

        // Respond with a success message and the newly created user
        res.status(201).json({ data: newUser, dataCount: count, msg: 'User created successfully' });
    } catch (error) {
        console.error(`Unable to create user: ${email}`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const userIdToUpdate = req.params.id;
    const updatedData = req.body;

    try {
        const { updatedUser, count } = await UserService.updateUser(userIdToUpdate, updatedData);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        delete updatedUser.password;
        res.status(200).json({ data: updatedUser, dataCount: count, msg: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    const userIdToDelete = req.params.id;
    
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

