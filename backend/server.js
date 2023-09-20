const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// const publicBasePath = "../frontend/pages";
const AuthService = require('../frontend/services/auth.service');
const UserService = require('../frontend/services/user.service');

// midddlwares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/pages')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/pages/login')));
app.use(express.static(path.join(__dirname, './backend/data')));
// app.use(express.static(path.join(__dirname, '../frontend/services')));
// app.use(express.static('public', { 'Content-Type': 'text/css' }));

// routes
app.get('/', (_req, res) => {
    const filePath = path.join(__dirname, '../frontend/pages/login', 'login.html');
    res.sendFile(filePath);
});

// app.get('/msg', (req, res) => {
//     const jsonData={message :'this is json msg'};
//     res.json(jsonData); // Sends a plain text response
// });


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
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users',async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            res.status(400).json({ error : 'Please provide all required fields'});
        }

        const userFilePath=path.join(__dirname,'./data','users.json');
        const userData=await fs.readFile(userFilePath,'utf-8');
        const users=JSON.parse(userData);
        
        if(users.some((user)=>user.email === email)){
            res.status(400).json({error : 'Email is already in use'});
        }

        const newUser = {
            email,
            password,
            name
        };
        users.push(newUser);
        await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf8');
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});
app.patch('/api/users/:email', async (req, res) => {
    const userToUpdate = req.params.email;
    const updatedData = req.body;

    try {
        const userFilePath=path.join(__dirname,'./data','users.json');
        const userData = await fs.readFile(userFilePath,'utf-8');
        const users = JSON.parse(userData);

        const userEmail = users.find((user)=>user.email === userToUpdate);
        if(!userEmail){
            return res.status(404).json({ error : 'User email not found'});
        }
    
            userEmail.email = updatedData.email;
            userEmail.name = updatedData.name;
        
        await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf8');
        res.status(201).json(userEmail);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.post("/api/users", (req, res) => {
//     console.log(req.query)
//     const data = path.join(__dirname, './data', 'users.json');
//     res.sendFile(data);
// });

app.listen(port, (err) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('yeh! server is up and running on port: ', port);
});

