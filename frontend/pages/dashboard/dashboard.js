document.addEventListener('DOMContentLoaded',() => {
    const username=localStorage.getItem('username');
    const usernameElement=document .getElementById("username");

    if(usernameElement){
        usernameElement.textContent=username;
    }
});