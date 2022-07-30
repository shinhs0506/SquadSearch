import axios from './axios';

class MessageAPI {
    static async getMessagesByChatId(id) {
        const res = await axios.get(`/messages/${id}`);
        return res;
    }

    static async createMessage(chatId, sender, text) {
        const res = await axios.post('/messages', { chatId, sender, text });
        return res;
    }
}

export default MessageAPI;
