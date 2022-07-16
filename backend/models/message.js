import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
    },
    text: {
        type: String, 
        required: true,
    },
},
{ timestamps: true } 
);

const Message = mongoose.model('Message', MessageSchema);
export default Message;