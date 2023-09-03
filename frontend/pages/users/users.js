
// import userservuce 

// const { json } = require("body-parser");

// console.log("helo");
function userTable() {
    
    const table = document.querySelector(".user-table");
    console.log(users);
    // const users = UserService.getUsers();
    let loginUserEmail = localStorage.getItem('email');
    users.forEach(user => {
        if(user.email !==  loginUserEmail){
            const row = table.insertRow();
            const emailCell = row.insertCell(0);
            const nameCell = row.insertCell(1);

            emailCell.textContent = user.email;
            nameCell.textContent = user.name;
        }
    });
    let usersSavedInLS = JSON.parse(localStorage.getItem("addedUsers"));
    usersSavedInLS.forEach(user => {
        const row = table.insertRow();
        const emailCell = row.insertCell(0);
        const nameCell = row.insertCell(1);

        emailCell.textContent = user.email;
        nameCell.textContent = user.name;
    });
}

function logout(){
    localStorage.clear();
    window.location.href = '../login/index.html';
}

window.addEventListener("DOMContentLoaded", userTable);