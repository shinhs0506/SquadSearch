import { axios, setHeader } from './axios';

class ChatAPI {
    static async getAllChats() {
        setHeader();
        const res = await axios.get('/chats');
        return res;
    }

    static async getAllPrivateChats(userId) {
        setHeader();
        const res = await axios.get(`/chats/${userId}`);
        return res;
    }

    static async createChat(name, members) {
        setHeader();
        const res = await axios.post('/chats', { name, members });
        return res;
    }

    static async createPrivateChat(name, members) {
        setHeader();
        const res = await axios.post('/chats/privateChat', { name, members });
        return res;
    }

    static async createMessage(chatId, sender, text) {
        setHeader();
        const res = await axios.post(`/chats/${chatId}`, { chatId, sender, text });
        return res;
    }

    static async getAllMessages(chatId) {
        setHeader();
        const res = await axios.get(`/chats/messages/${chatId}`);
        return res;
    }

    static async getSenderInfo(userId) {
        setHeader();
        const res = await axios.get(`/chats/senderInfo/${userId}`);
        return res;
    }

    static async joinChats(eventId, email) {
        setHeader();
        const res = await axios.post(`/chats/${eventId}/join`, { email });
        return res;
    }

    static async deleteChat(chatId) {
        setHeader();
        const res = await axios.delete(`/chats/${chatId}`);
        return res;
    }
}

export default ChatAPI;
