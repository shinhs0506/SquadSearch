import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        binData: Buffer,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
});

const User = mongoose.model('User', UserSchema);
export default User;
