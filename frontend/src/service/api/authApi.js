import { axios, setHeader } from './axios';

class AuthAPI {
    static async loginUser(email, password) {
        const res = await axios.post('/auth/login', { email, password });
        return res;
    }

    static async logoutUser() {
        setHeader();
        console.log(token);
        const res = await axios.post(
            `/auth/logout`, 
            {}, 
        );
        return res;
    }

    static async signupUser(name, email, password) {
        const res = await axios.post('/auth/signup', { name, email, password });
        return res;
    }

    static async updateUser(name, password, profilePicture, bio) {
        setHeader();
        const res = await axios.post(
            `/auth/update`,
            {
                name, password, profilePicture, bio,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return res;
    }
}

export default AuthAPI;
