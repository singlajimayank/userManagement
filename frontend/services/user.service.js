class UserService {
    static users = [
        { email: "Sun@gmail.com", password: "0001", name: "Sunny" },
        { email: "May@gmail.com", password: "5678", name: "Mayank" },
        { email: "Pri@gmail.com", password: "rusk", name: "Prince" },
    ];
    static login(email, password) {
        console.log(email, password, '123');
        const user = users.find(user => user.email === email && user.password === password);
        if(user){
            return user;
        }
        console.log('user', '234');
        return null;
    }
}

// export default UserService;