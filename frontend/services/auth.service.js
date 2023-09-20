class AuthService {

    static login(email, password) {
        const users = UserService.getUsers();
        const user = users.find(user => user.email === email && user.password === password);

        return user;
    }
    static logout() {
        localStorage.clear();
    }
}
