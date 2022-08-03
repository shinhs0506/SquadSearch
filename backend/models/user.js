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

// UserSchema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform(doc, ret) {
//         if (typeof doc.profilePicture !== undefined) {}
//         const base64 = doc.profilePicture.toString('base64');
//         const res = ret;
//         res.profilePicture = `data:image/png;base64,${base64}`;

//         return res;
//     },
// });

const User = mongoose.model('User', UserSchema);
export default User;
