const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET_KEY;


class AuthService {
    static PUBLIC_URLS = ['/auth/login'];

    static checkToken(req, res, next) {
        const isPublic = AuthService.PUBLIC_URLS.find((url) => url.toLowerCase() === req.path.toLowerCase());

        if (isPublic) {
            return next();
        } else {
            const token = req.headers.authorization;
            try {
                const decoded = jwt.verify(token, jwtSecretKey);
                req.user = decoded;
                return next();
            } catch (error) {
                res.status(401).json({ error: 'Unauthorized' });
            }

        }
    }
    static createToken(email) {
        const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
        return token;
    }
}
module.exports = AuthService;