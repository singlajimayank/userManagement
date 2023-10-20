const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');

const apiRoutes = require('./routes/api-routes');
const AuthService = require('./services/auth.service');

const app = express();
const port = process.env.PORT || 8000;


// midddlwares
app.use(express.json());
app.use('/api', AuthService.checkToken);

// static 
app.use(express.static(path.join(__dirname, '../frontend/pages')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/pages/login')));
app.use(express.static(path.join(__dirname, './backend/data')));

// 
app.use(apiRoutes);


// routes
app.get('/', (_req, res) => {
    const filePath = path.join(__dirname, '../frontend/pages/login', 'login.html');
    res.sendFile(filePath);
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('DB Connection Successful');
}).catch((error) => {
    console.log(error);
})


app.listen(port, (err) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('yeh! server is up and running on port: ', port);
});

