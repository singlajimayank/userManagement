// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored username and email from localStorage
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    // Get the HTML element where the username and email will be displayed
    const usernameElement = document.getElementById("username");
    const emailElement = document.getElementById('useremail');
    const welcomeUsernameElement = document.getElementById('welcomeUsername');

    // Check if the usernameElement, emailElement, and welcomeUsernameElement exist in the DOM
    if (usernameElement && emailElement && welcomeUsernameElement) {
        // Update the content with stored username and email
        usernameElement.textContent = username;
        emailElement.textContent = email;
        welcomeUsernameElement.textContent = username;
    }
});
function logout() {
    AuthService.logout();

    // Redirect the user to the login page
    window.location.href = '../login/login.html';
}



