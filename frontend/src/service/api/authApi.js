import axios from './axios';

class AuthAPI {
    static async loginUser(email, password) {
        const res = await axios.post('/auth/login', { email, password });
        return res;
    }

    static async logoutUser(email) {
        const res = await axios.post(`/auth/logout/${email}`, {});
        return res;
    }

    static async signupUser(name, email, password) {
        const res = await axios.post('/auth/signup', { name, email, password });
        return res;
    }

    static async updateUser(email, name, password, profilePicture, bio) {
        const res = await axios.post(
            `/auth/update/${email}`,
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
