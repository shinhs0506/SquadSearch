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
}

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
        const chats = event.chats;
        chats.forEach(async (chat) => {
            await Chat.findByIdAndUpdate(
                chat,
                { $push: { members: userId }},
                { new: true },
            )
        });
        return res.send(chats);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while joining chat' });
    }
}

export default {
    getAllChats, getAllChatsWithUser, createChat, createMessage, getAllMessages, getSenderInfo, joinChats,
};
