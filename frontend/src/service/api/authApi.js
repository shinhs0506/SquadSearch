import axios from './axios';

class AuthAPI {
    static async loginUser(email, password) {
        const res = await axios.post('/auth/login', { email, password });
        return res;
    }

    static async signupUser(name, email, password) {
        const res = await axios.post('/auth/signup', { name, email, password });
        return res;
    }
}

export default AuthAPI;
