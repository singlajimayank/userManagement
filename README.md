# userManagement

 The User Management System is a web application that allows users to `log in`, view a `dashboard`, and manage `user data`. It provides `authentication` and `authorization` features to ensure secure access to user-related functionalities. 

## Backend

The backend of this project is responsible for handling server-side operations, managing routes, and serving API requests. It uses `Node.js` and `Express.js` as the primary technologies.

### Server.js
`server.js` is the main server file responsible for initializing and running the backend server.It sets up the Express.js server, configures middleware, and defines routes for the project.

To start the project we need to make a copy of .env.sample and rename as .env and fill the all values with actual secrets.

## Frontend

The frontend of this project handles the user interface, including web pages and client-side logic. It uses HTML, CSS, and JavaScript to create a responsive and interactive user experience.

### Pages

The `pages` directory contains HTML, CSS, and Javascript files for different pages of the web application, including login, dashboard, and user management.

### Services

The `services` directory contains JavaScript files responsible for handling authentication and user data.

#### AuthService.js

The `AuthService.js` file includes functions for user authentication, such as login and logout.

#### UserService.js

The `UserService.js` file manages user data, including email and password information.

