import Chat from '../models/chat.js';
import User from '../models/user.js';

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
            messages: [],
        });
        return res.send(chat);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating a chat, please try again' });
    }
};

const createMessage = async (req, res) => {
    const { chatId, sender, text } = req.body;

    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { messages: { sender, text } } },
            { new: true },
        );
        return res.send(chat);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating a message, please try again' });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);
        const { messages } = chat;
        return res.send(messages);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while getting messages, please try again' });
    }
};

const getSenderInfo = async (req, res) => {
    try {
        const sender = await User.findById(req.params.userId);
        return res.send(sender);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while finding sender info' });
    }
};

export default {
    getAllChatsWithUser, createChat, createMessage, getAllMessages, getSenderInfo,
};
