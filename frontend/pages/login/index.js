/**
 * Get Value of passed element name from dom
 * @param {string} elId 
 * @returns {string} value of element
 */
function getElValue(elId) {
    return document.getElementById(elId).value;
}

/**
 * Handle the login functionality
 */
function login() {
    // Get the user's email and password from input fields
    const useremail = getElValue("mail");
    const password = getElValue("password");

    // Attempt to authenticate the user using the login method from the UserService class
    const user = UserService.login(useremail, password);
    
    // If a matching user is found
    if (user) {
        // Store the username  and email in localStorage
        localStorage.setItem('username', user.name);
        localStorage.setItem('email', useremail);
        // Redirect the user to the dashboard page
        window.location.href = '../dashboard/dashboard.html';
    } else {
        alert("Invalid Credentials");
    }
}