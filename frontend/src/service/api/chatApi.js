import { axios, setHeader } from './axios';

class ChatAPI {
    static async getAllChatsWithUser(id) {
        const res = await axios.get(`/chats/${id}`);
        return res;
    }

    static async createChat(name, members) {
        const res = await axios.post('/chats', { name, members });
        return res;
    }
}

export default ChatAPI;
