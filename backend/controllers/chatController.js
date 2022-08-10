import Chat from '../models/chat.js';
import User from '../models/user.js';
import Event from '../models/event.js';

const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({});
        return res.send(chats);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while getting chats' });
    }
};

const getAllPrivateChats = async (req, res) => {
    try {
        const chats = await Chat.find({ name: { $regex: req.params.userId } });
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

const createPrivateChat = async (req, res) => {
    const { name, members } = req.body;
    try {
        const chat = await Chat.create({
            name,
            members,
            private: true
        });
        return res.send(chat);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating a private chat' });
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

const joinChats = async (req, res) => {
    const { eventId } = req.params;
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }).orFail();
        const userId = user._id;
        const event = await Event.findById(eventId).orFail();
        const { chats } = event;
        chats.forEach(async (chat) => {
            await Chat.findByIdAndUpdate(
                chat,
                { $push: { members: userId } },
                { new: true },
            );
        });
        return res.send(chats);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while joining chat' });
    }
};

const deleteChat = async (req, res) => {
    const { chatId } = req.params;
    try {
        await Chat.findByIdAndDelete(chatId);
        return res.send(chatId);
    } catch (e) {
        return res.status(500).send({ message: 'Error orccured while deleting chat' });
    }
};

export default {
    getAllChats,
    getAllPrivateChats,
    createChat,
    createPrivateChat,
    createMessage,
    getAllMessages,
    getSenderInfo,
    joinChats,
    deleteChat,
};
