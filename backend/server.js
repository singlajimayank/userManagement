const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const AuthService = require('../frontend/services/auth.service');
const jwt = require('jsonwebtoken');
const UserService = require('./services/users.service');
const { userController, authController } = require('./controllers/api-controllers');


const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
let jwtSecretKey = process.env.JWT_SECRET_KEY;


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

app.post('/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide both email and password' });
        }
        const user = AuthService.login(email, password);
        if (user) {
            const token = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Authentication successful', token });

        } else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/users', async (req, res) => {
    const { name, email } = req.query;
    try {
        const userFilePath = path.join(__dirname, './data', 'users.json');
        const userData = await fs.readFile(userFilePath, 'utf8');
        const users = JSON.parse(userData);

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
        // filteredUsers.forEach((user) => {
        //     delete user.password;
        //     delete user.id;
        // });
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * API to create new user
 * Email id should be unique
 */
// app.post('/api/users', userController.createUser);

// app.post('/api/users', async (req, res) => {
//     const { email, password, name } = req.body;
//     try {
//         // fiels that are required to create user
//         const requiredFields = [email, password, name];

//         if (!requiredFields.every(Boolean)) {
//             res.status(400).json({ error: 'Please provide all required fields' });
//         }

//         // Check if a user with the provided email already exists
//         const existingUser = await UserService.getUser(email);
//         // If a user with the same email is found, respond with an error
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email is already in use' });
//         }


//         const newUser = await UserService.createUser(email, password, name);
//         delete newUser.password;

//         // app-messages.js

//         /**
//          * const APP_MESSAGES = { USER : { ADD : "User created success"} };
//          * const APP_ERR_MESSAGES : { INTERNAL_SERVER_ERROR : "System failure, please contact with admin"};
//          */
//         res.status(201).json({ data: newUser, msg: "User created" });
//     } catch (err) {
//         console.error(`Unable to create user : ${email}`, err);
//         res.status(500).json({ err: { msg: 'Internal server error' } });
//     }

//     // {data,dataCount, msg, err :{msg, err}}
// });

app.patch('/api/users/:id', async (req, res) => {
    const userIdToUpdate = req.params.id;
    const updatedData = req.body;

    try {
        const userFilePath = path.join(__dirname, './data', 'users.json');
        const userData = await fs.readFile(userFilePath, 'utf-8');
        const users = JSON.parse(userData);

        const userId = users.find((user) => user.id === userIdToUpdate);
        if (!userId) {
            return res.status(404).json({ error: 'User Id not found' });
        }

        userId.email = updatedData.email;
        userId.name = updatedData.name;

        const responseUser = { ...userId };
        delete responseUser.password;
        await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf8');
        res.status(201).json(responseUser);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    const userIdToDelete = req.params.id;
    try {
        const userFilePath = path.join(__dirname, '/data', 'users.json');
        const userData = await fs.readFile(userFilePath, 'utf-8');
        let users = JSON.parse(userData);

        const userIndex = users.findIndex((user) => user.id === userIdToDelete);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User ID not found' });
        }
        users.splice(userIndex, 1);
        await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf8');
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('yeh! server is up and running on port: ', port);
});
// uuid -> module for uniqiue ids -> er.markar@gmail.com
/**
 * Server.js -> user, customer, contact, project, program  -> require api-controllers.js
 *  conrollers/
 *      api-controllers.js -> required all controllers in this
 *      user.controller
 *      auth.controller.js
 *  services/
 *      users.service.js
 *          -> getUsers({email, searchText, status : ACTIVE | INACTIVE | SUSPENDED | DELETED})
 *          -> createUser
 *          
 */
