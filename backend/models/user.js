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
        type: Buffer,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        const base64 = doc.profilePicture.toString('base64');
        ret.data = base64;

        return ret;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;
