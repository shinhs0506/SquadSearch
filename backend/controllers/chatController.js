import Chat from '../models/chat.js';

const getAllChatsWithUser = async (req, res) => {
    try {
        const chats = await Chat.find({ members: { $in: [req.params.userId] } });
        return res.send(chats);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while filtering chats' });
    }
};

const createChat = async (req, res) => {
    const { name, members } = req.body;

    try {
        const chat = await Chat.create({
            name,
            members,
        });
        return res.send(chat);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating a chat, please try again' });
    }
};

export default {
    getAllChatsWithUser, createChat,
};
