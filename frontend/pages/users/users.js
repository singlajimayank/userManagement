// Function to populate the user table with user data
function userTable() {
    // Reference the 'user-table' HTML element
    const table = document.querySelector(".user-table");

    // const users = UserService.getUsers();
    // Retrieve the email of the logged-in user from local storage
    let loginUserEmail = localStorage.getItem('email');

    // Loop through the list of users
    UserService.users.forEach(user => {
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
}

// Function to logout the user and redirect to the login page 
function logout() {
    // Clear all data stored in localStorage 
    localStorage.clear();

    // Redirect the user to the login page
    window.location.href = '../login/index.html';
}

// Execute the userTable function when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", userTable);