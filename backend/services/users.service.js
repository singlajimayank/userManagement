const User = require('../models/users.models');

class UserService {
    static async getUser(email) {
        try {
            const users = await User.findOne({ email: email });
            return users;
        } catch (error) {
            console.log('Error getting user:', error.message);
            throw error;
        }
    }

    static async getFilteredUsers({ email, name, page, limit, sorting }) {
        try {
            const pipeline = [];
            if (email) {
                pipeline.push({ $match: { email: email } });
            }
            if (name) {
                pipeline.push({ $match: { name: name } });
            }
            if (page && limit) {
                pipeline.push({ $skip: (page - 1) * limit });
                pipeline.push({ $limit: limit });
            }
            if (sorting) {
                pipeline.push({ $sort: { [sorting]: 1 } });
            }
            return await User.aggregate(pipeline);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async createUser(email, password, name) {
        try {
            const newUser = await User.create({
                email,
                password,
                name,
            });
            const count = await User.countDocuments({});
            return { newUser, count };
        } catch (error) {
            console.log('Error creating user:', error.message);
            throw error;
        }
    }
    static async updateUser(userId, updatedData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
            const count = await User.countDocuments({});
            return { updatedUser, count };
        } catch (error) {
            console.log('Error Updating User:', error.message);
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            console.log('Error deleting user:', error.message);
            throw error;
        }
    }
}
module.exports = UserService;