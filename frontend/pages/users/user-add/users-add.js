// Function to add a new user and store it in local storage
function addUser() {
    // Get the name and email values from the input fields
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;

    // Check if both name and email fields are not empty
    if (nameValue != '' && emailValue != '') {
        // Initialize an array to store added users
        let addedUsers = [];
        // Check if 'addedUsers' key exists in local storage
        if (localStorage.getItem('addedUsers') == undefined) {
            // If not, create a new array with the current user and store it in local storage
            addedUsers.push({
                name: nameValue,
                email: emailValue
            });
            localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
        }
        else {
            // If 'addedUsers' key exists, retrieve the existing array from local storage
            addedUsers = JSON.parse(localStorage.getItem('addedUsers'));
             // Add the current user to the array
            addedUsers.push({
                name: nameValue,
                email: emailValue
            })
            // Update the 'addedUsers' array in local storage
            localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
        }
    }

    // Redirect the user to the 'users' page
    window.location.href = '../user-list/users.html';
}