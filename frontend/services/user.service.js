
class UserService {
    static users = [
        { email: "Sun@gmail.com", password: "0001", name: "Sunny" },
        { email: "May@gmail.com", password: "5678", name: "Mayank" },
        { email: "Pri@gmail.com", password: "rusk", name: "Prince" },
    ];
    static getUsers() {
        return UserService.users;

    }
}
