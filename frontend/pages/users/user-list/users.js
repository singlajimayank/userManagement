/**
 * Function to update the content of a dropdown menu with the user's username and email
 * retrieved from localStorage.
 */
function updateDropdownContent() {
    // Retrieve the stored username and email from localStorage
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    // Get the HTML element where the username and email will be displayed
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('useremail');

    // Check if the usernameElement andf emailElement exist in the DOM
    if (usernameElement && emailElement) {
        // Update the content with stored username and email
        usernameElement.textContent = username;
        emailElement.textContent = email;
    }
}
// Function to populate the user table with user data
async function userTable() {
    updateDropdownContent();
    // Reference the 'user-table' HTML element
    const table = document.querySelector(".user-table");
    try {
        const users = await UserService.getUsers();
        // Retrieve the email of the logged-in user from local storage
        let loginUserEmail = localStorage.getItem('email');

        // Loop through the list of users
        users.forEach(user => {
            // Check if the user is not the currently logged-in user
            if (user.email !== loginUserEmail) {
                // Create a new row in the table
                const row = table.insertRow();

                // Create cells for email and name
                const emailCell = row.insertCell(0);
                const nameCell = row.insertCell(1);

                // Populate the cells with user data
                emailCell.textContent = user.email;
                nameCell.textContent = user.name;
            }
        });

        // Retrieve additional users saved in local storage (if any)
        let usersSavedInLS = JSON.parse(localStorage.getItem("addedUsers"));

        // Loop through the additional users
        usersSavedInLS.forEach(user => {
            // Create a new row in the table
            const row = table.insertRow();

            // Create cells for email and name
            const emailCell = row.insertCell(0);
            const nameCell = row.insertCell(1);

            // Populate the cells with user data
            emailCell.textContent = user.email;
            nameCell.textContent = user.name;
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error, e.g., display an error message to the user
    }
}


// Function to logout the user and redirect to the login page 
function logout() {
    // // Clear all data stored in localStorage 
    // localStorage.clear();
    AuthService.logout();

    // Redirect the user to the login page
    window.location.href = '../../login/login.html';
}

// Execute the userTable function when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", userTable);