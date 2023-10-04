const fs = require('fs/promises');
const path = require('path');

class UserService {
    static async readUserData() {
        const filePath = path.join(__dirname, '../data', 'users.json');
        const userData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(userData);
    }

    static async getUser(email) {
        const users = await this.readUserData();

        // Find the user with the matching email
        const user = users.find((user) => user.email === email);

        return user || null;
    }

    static async getFilteredUsers(name, email) {
        try {
            const users = await this.readUserData();
            let filteredUsers = users;

            if (name) {
                filteredUsers = filteredUsers.filter((user) =>
                    user.name.toLowerCase() === name.toLowerCase()
                );
            }

            if (email) {
                filteredUsers = filteredUsers.filter((user) =>
                    user.email.toLowerCase() === email.toLowerCase()
                );
            }

            return filteredUsers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async createUser(email, password, name) {
        try {
            const filePath = path.join(__dirname, '../data', 'users.json');
            const users = await this.readUserData();

            const newUserId = users.length + 1;


            const newUser = {
                id: newUserId,
                email,
                password,
                name,
            };

            users.push(newUser);
            await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
            return newUser;
        } catch (error) {
            console.log('Error creating user:', error.message);
            throw error;
        }
    }
    static async updateUser(userId, updatedData) {
        try {
            const filePath = path.join(__dirname, '../data', 'users.json');
            const users = await this.readUserData();

            //Find the index of the user with the matching id
            const userIndex = users.findIndex((user) => user.id === userId);

            if (userIndex === -1) {
                // throw new error('User Id not found');
                return null;
            }

            //Update the user's information
            const updatedUser = { ...users[userIndex], ...updatedData };
            users[userIndex] = updatedUser;

            // Save the updated user data back to the file
            await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
            return updatedUser;
        } catch (error) {
            console.log('Error updating user:', error.message);
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            const filePath = path.join(__dirname, '../data', 'users.json');
            const users = await this.readUserData();

            const userIndex = users.findIndex((user) => user.id === userId);
            if (userIndex === -1) {
                return null;
            }
            users.splice(userIndex, 1);
            await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        } catch (error) {
            console.log('Error deleting user:', error.message);
            throw error;
        }
    }
}
module.exports = UserService;