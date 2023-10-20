class UserService {

    static getUsers() {
        const token = localStorage.getItem('token');
        return axios.get(`${CONFIG.API_SERVER_URL}/api/users`, { headers: { Authorization: token, }, params: { page: 1, limit: 4 } })
            .then(response => response.data)
            .catch(error => {
                console.log("Error getting resources", error);
                throw error;
            });

    }
}

