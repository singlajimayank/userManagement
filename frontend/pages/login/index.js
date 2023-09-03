// const { default: UserService } = require("./services/user.service");
const users=[
    { email: "Sun@gmail.com", password: "0001", name: "Sunny" },
    { email: "May@gmail.com", password: "5678", name: "Mayank" },
    { email: "Pri@gmail.com", password: "rusk", name: "Prince" },
];

let loginUsername = '';
let loginEmail = '';

// import UserService from "./services/user.service";
// const us = require(UserService);
// export default users;
/**
 * Get Value of passed element name from dom
 * @param {string} elId 
 * @returns {string} value of element
 */
function getElValue(elId) {
    return document.getElementById(elId).value;
}

function login() {
    const useremail = getElValue("mail");
    const password = getElValue("password");
    const user = users.find(user => user.email === useremail && user.password === password);
    // const user = UserService.login(username, password);
    // console.log(username, password, user);
    if (user) {
        // Store the username in localStorage
        localStorage.setItem('username', user.name);
        localStorage.setItem('email', useremail);
        // localStorage.setItem('password', password);
        // alert("Welcome! " + user.name);
        // Redirect to the dashboard page
        window.location.href = '../dashboard/dashboard.html';
    } else {
        alert("Invalid Credentials");
    }
}