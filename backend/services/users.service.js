const User = require('../models/users.models');

class UserService {

    /**
     * Get user by email with password.
     * @param {string} email Email of user 
     * @returns {Promise<{email, name}>}
     */
    static async getUserWithPassword({ email }) {
        try {
            return User.findOne({ email });
        } catch (error) {
            console.error('Error getting user:', error.message);
            throw error;
        }
    }

    /**
     * Get filtered users
     * @param {{ email, name, page, limit, sorting }} filter 
     * @returns {Promise<{data : Array<{name, email, createdOn, createdBy}, dataCount>}>}
     */
    static async getUsers(filter) {
        try {
            const pipeline = [{ $match: {} }];
            if (filter.email) {
                pipeline[0].$match.email = filter.email;
            }
            if (filter.name) {
                pipeline[0].$match.name = filter.email;
            }
            if (filter.page && filter.limit) {
                pipeline.push({ $skip: (filter.page - 1) * filter.limit });
                pipeline.push({ $limit: filter.limit });
            }
            if (filter.sorting) {
                pipeline.push({ $sort: { [filter.sorting]: 1 } });
            }
            const responses = await Promise.all([User.aggregate(pipeline)]);

            return { data: responses[0], dataCount: responses[1] }
        } catch (error) {
            console.error('Error fetching users data:', error.message);
            throw error;
        }
    }

    /**
     * Create a new user 
     * @param {{ email, password, name }} user data for creating new user
     * @returns {Promise<{newUser}>}
     */
    static async createUser({ email, password, name }) {
        try {
            const newUser = await User.create({
                email, password, name,
            });

            delete newUser.password;

            return { newUser };
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    }

    /**
     * 
     * @param {string} userId 
     * @param {{ email?, password?, name? }} updatedData 
     * @returns {Promise<{ updateUser, count }>}
     */
    static async updateUser(userId, updatedData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
            const count = await User.countDocuments({});
            return { updatedUser, count };
        } catch (error) {
            console.error('Error Updating User:', error.message);
            throw error;
        }
    }

    /**
     * 
     * @param {string} userId 
     * @returns {Promise<{Deleted Document}>}
     */
    static async deleteUser(userId) {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            console.error('Error deleting user:', error.message);
            throw error;
        }
    }
}
module.exports = UserService;