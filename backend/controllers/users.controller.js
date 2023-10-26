const UserService = require('../services/users.service');

class UsersController {
    static async getUser(req, res) {
        const { email, name, sorting } = req.query;
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;

        try {
            const users = await UserService.getUsers({ email, name, page, limit, sorting });

            // Send the list of users as a JSON response
            res.status(200).json(users);
        } catch (error) {
            console.error(`Unable to fetch user data: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createUser(req, res) {
        const { email, password, name } = req.body;
        try {
            const requiredFields = [email, password, name];
            if (!requiredFields.every(Boolean)) {
                return res.status(400).json({ error: 'Please provide all required fields' });
            }

            // Check if a user with the provided email already exists
            const existingUser = await UserService.getUserWithPassword({ email });

            // If a user with the same email is found, respond with an error
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already in use' });
            }

            // Create a new user using the UserService
            const { newUser } = await UserService.createUser({ email, password, name });

            // Respond with a success message and the newly created user
            res.json({ data: newUser, msg: 'User created successfully' });
        } catch (error) {
            console.error(`Unable to create user: ${email}`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateUser(req, res) {
        const userIdToUpdate = req.params.id;
        const updatedData = req.body;
        try {
            const { updatedUser } = await UserService.updateUser(userIdToUpdate, updatedData);
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' })
            }
            delete updatedUser.password;
            res.status(200).json({ data: updatedUser, msg: 'User updated successfully' });
        } catch (error) {
            console.error(`Unable to update user with ID:${userIdToUpdate}`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteUser(req, res) {
        const userIdToDelete = req.params.id;
        try {
            const deletedUser = await UserService.deleteUser(userIdToDelete);
            if (!deletedUser) {
                return res.status(204).json({ error: 'User not find' })
            }
            return res.send({ data: deletedUser });
        } catch (error) {
            console.error(`Unabele to delete user with ID:${userIdToDelete}`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = UsersController;
