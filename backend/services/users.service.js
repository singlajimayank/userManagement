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
            console.error('Error creating user:', error.message);
            throw error;
        }
    }
}
module.exports = UserService;