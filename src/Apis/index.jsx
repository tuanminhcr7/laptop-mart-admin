import axios from "axios"
import Cookies from "js-cookie";
import qs from 'qs';

const domain = "http://localhost:3000/api/v1";
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
}

const Api = {
    // Users
    login(payload) {
        return axios.post(`${domain}/users/auth/login`, payload, {
            headers: headers
        });
    },
    profile() {
        return axios.get(`${domain}/users/profile`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },
    userList(params) {
        return axios.get(`${domain}/users?${qs.stringify(params)}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },
    userDetail(id) {
        return axios.get(`${domain}/users/${id}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },
    userUpdate(id, payload) {
        return axios.patch(`${domain}/users/${id}`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    }
}

export default Api