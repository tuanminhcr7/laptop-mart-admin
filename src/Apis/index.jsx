import axios from "axios"

const domain = "http://localhost:3000/api/v1";
const headers = {

}

const Api = {
    // Users
    login(payload) {
        return axios.post(`${domain}/users/auth/login`, payload);
    },
    updateProfile(id, payload) {
        return axios.post(`${domain}/users/${id}`, payload);
    }
}

export default Api