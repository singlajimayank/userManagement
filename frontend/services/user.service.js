class UserService {

    static getUsers() {

        return axios.get(`${CONFIG.API_SERVER_URL}/api/users`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error getting resources", error);
                throw error;
            });

    }
}