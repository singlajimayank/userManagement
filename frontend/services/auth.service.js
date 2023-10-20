class AuthService {

    static async login(email, password) {
        return axios.post(`${CONFIG.API_SERVER_URL}/auth/login`, { email, password })
            .then((res) => {
                // save token on localstorage or in cookies to use in other apis
                localStorage.setItem('token', res.data.token);
                return res.data;
            });
    }

    static logout() {
        localStorage.clear();
    }
}
