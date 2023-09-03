function addUser(){
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;

    if(nameValue != '' && emailValue != ''){

    let addedUsers = [];
    if(localStorage.getItem('addedUsers') == undefined){
        console.log('if condn');
        addedUsers.push({
            name: nameValue,
            email: emailValue
        });

        console.log(JSON.stringify(addedUsers));
        localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
    }
    else{
        console.log('else condn');
        addedUsers = JSON.parse(localStorage.getItem('addedUsers'));
        addedUsers.push({
            name: nameValue,
            email: emailValue
        })
        console.log(JSON.stringify(addedUsers));
        localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
    }
}
    // console.log(addedUsers);

    window.location.href = '../users/users.html';
}