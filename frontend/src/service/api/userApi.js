import { axios, setHeader } from './axios';

class UserAPI {
    static async getProfile(userId) {
        setHeader();
        const res = await axios.get(`/users/${userId}/getProfile`);
        return res;
    }
}

export default UserAPI;
