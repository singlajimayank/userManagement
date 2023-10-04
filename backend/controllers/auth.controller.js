const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const UserService = require('../services/users.service');

dotenv.config();
let jwtSecretKey = process.env.JWT_SECRET_KEY;


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const requiredFields = [email, password];
        if (!requiredFields.every(Boolean)) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const user = await UserService.getUser(email);
        if (user && user.password === password) {
            const token = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Authentication successful', token });
        }
        else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};