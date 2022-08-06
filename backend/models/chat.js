import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        messages: [{
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
        }],
    },
    { timestamps: true },
);

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
