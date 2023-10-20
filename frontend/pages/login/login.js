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
async function login() {
    // Get the user's email and password from input fields
    const useremail = getElValue("mail");
    const password = getElValue("password");
    if (useremail && password) {
        try {
            const user = await AuthService.login(useremail, password);
            // If a matching user is found
            // Store the username  and email in localStorage
            localStorage.setItem('username', user.data.name);
            localStorage.setItem('email', useremail);
            // Redirect the user to the dashboard page
            window.location.href = '../dashboard/dashboard.html';
        } catch (error) {
            console.error("Error:", error);
            alert("Invalid Creds");
        }
    }
}
// Get references to login button and login form
const loginButton = document.getElementById("loginButton");
const loginForm = document.getElementById("loginForm");

// Add click event listener to login button
loginButton.addEventListener("click", login);

// Add keydown event listener to login form for Enter key
loginForm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        login();
    }
});

