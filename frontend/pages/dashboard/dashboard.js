// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored username from localStorage
    const username = localStorage.getItem('username');

    // Get the HTML element where the username will be displayed
    const usernameElement = document.getElementById("username");

    // Check if the usernameElement exists in the DOM
    if (usernameElement) {
        //update the content with stored username
        usernameElement.textContent = username;
    }
});