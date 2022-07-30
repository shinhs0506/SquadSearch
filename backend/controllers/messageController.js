import Message from '../models/message.js';

const getMessagesByChatId = async (req, res) => {
    try {
        const messages = await Message.find({
            chatId: req.params.chatId,
        });
        return res.send(messages);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while filtering messages, please try again' });
    }
};

const createMessage = async (req, res) => {
    const { chatId, sender, text } = req.body;

    try {
        const message = await Message.create({
            chatId,
            sender,
            text,
        });
        return res.send(message);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating a message, please try again' });
    }
};

export default {
    getMessagesByChatId, createMessage,
};
