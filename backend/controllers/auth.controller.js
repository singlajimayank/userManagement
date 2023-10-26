const UserService = require('../services/users.service');
const AuthService = require('../services/auth.service');

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const requiredFields = [email, password];
            if (!requiredFields.every(Boolean)) {
                return res.status(400).json({ error: 'Please provide all required fields' });
            }
            const user = await UserService.getUserWithPassword({ email });
            if (user && user.password === password) {
                const token = AuthService.createToken(user.email);
                const userWithoutPassword = { ...user._doc };
                delete userWithoutPassword.password;
                return res.status(200).json({ data: userWithoutPassword, message: 'Authentication successful', token });
            } else {
                return res.status(401).json({ error: 'Authentication failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
module.exports = AuthController;

