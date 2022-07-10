import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const axios = Axios.create({
    baseURL: 'http://localhost:4000/api',
});

class AuthAPI {
    static async loginUser(email, password) {
        const res = await axios.post('/auth/login', { email, password });
        const decodedData = jwtDecode(`${res.data.tokenHeader}.${res.data.tokenBody}`);
        return decodedData;
    }

    static async signupUser(name, email, password) {
        const res = await axios.post('/auth/signup', { name, email, password });
        return res;
    }
}

export default AuthAPI;
