const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// const publicBasePath = "../frontend/pages";

// midddlwares
app.use(express.static(path.join(__dirname, '../frontend/pages/login')));
// app.use(express.static('public', { 'Content-Type': 'text/css' }));


// routes
app.get('/', (_req, res) => {
    const filePath = path.join(__dirname, '../frontend/pages/login', 'index.html');
    res.sendFile(filePath);
});

// app.get("/users", (req, res) => {
//     res.json({});
// })

app.listen(port, (err) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('yeh! server is up and running on port: ', port);
});