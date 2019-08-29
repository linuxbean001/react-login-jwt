import axios from 'axios';
import decode from 'jwt-decode';
export default class AuthService {
    constructor() {
        this.domain = 'http://localhost:3300'; // API server domain
        this.getProfile = this.getProfile.bind(this)
    }

    getProfile() {
        return decode(this.getToken());
    }
    login(username, password) {
        return axios.post(this.domain + '/api/v1/user/login', {
            email: username,
            pass: password
        })
            .then(result => {
                console.log(result);
                this.setToken(result.data.token);
                return Promise.resolve(result);
               
            });
    }
    setToken(idToken) {
        localStorage.setItem('id_token', JSON.stringify(idToken));
    }

    logout() {
        localStorage.removeItem('id_token');
    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { 
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    getToken() {
        let token = '';
        if (localStorage.getItem('id_token')) {
            token = JSON.parse(localStorage.getItem('id_token'));
        }
        return token
    }

    loggedIn() {
        const token = this.getToken() 
        return !!token && !this.isTokenExpired(token) 
    }
    // getProfile() {
    //     return decode(this.getToken());
    // }
}