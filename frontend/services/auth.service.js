class AuthService {

    static async login(email, password) {
        try {
            const users = await UserService.getUsers();
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                // Only return the user if credentials match
                console.log("User found:", user);
                return user;
            } else {
                // Return null for invalid credentials
                console.log("User not found for credentials:", email, password);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }

    }
    static logout() {
        localStorage.clear();
    }
}
