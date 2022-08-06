import axios from './axios';

class ChatAPI {
    static async getAllChatsWithUser(chatId) {
        const res = await axios.get(`/chats/${chatId}`);
        return res;
    }

    static async createChat(name, members) {
        const res = await axios.post('/chats', { name, members });
        return res;
    }

    static async createMessage(chatId, sender, text) {
        const res = await axios.post(`/chats/${chatId}`, { chatId, sender, text });
        return res;
    }

    static async getAllMessages(chatId) {
        const res = await axios.get(`/chats/messages/${chatId}`);
        return res;
    }

    static async getSenderInfo(userId) {
        const res = await axios.get(`/chats/senderInfo/${userId}`);
        return res;
    }
}

export default ChatAPI;
