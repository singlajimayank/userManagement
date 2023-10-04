const express = require('express');
const path = require('path');
const { userController, authController } = require('./controllers/api-controllers');
const jwt = require('jsonwebtoken');


const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

/**
 * Middleware to check the validity of a JWT token.
 * Verifies the provided JWT token in the request headers.
*/
const checkToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        return next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' })
    }
}


// midddlwares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/pages')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/pages/login')));
app.use(express.static(path.join(__dirname, './backend/data')));


// routes
app.get('/', (_req, res) => {
    const filePath = path.join(__dirname, '../frontend/pages/login', 'login.html');
    res.sendFile(filePath);
});

/**
 * POST request to authenticate a user and generate a JWT token.
 * Requires email and password in the request body.
 * Returns a JWT token on successful authentication.
 */
app.post('/auth/login', authController.login);

/**
 * GET request to fetch a list of users.
 */
app.get('/api/users', userController.getUser);

/**
 * POST request to create a new user.
 */
app.post('/api/users', userController.createUser);

/**
 * PATCH request to update a user's information by ID.
 */
app.patch('/api/users/:id', userController.updateUser);

/**
 * DELETE request to delete a user by ID.
 */
app.delete('/api/users/:id', checkToken, userController.deleteUser);



app.listen(port, (err) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('yeh! server is up and running on port: ', port);
});

