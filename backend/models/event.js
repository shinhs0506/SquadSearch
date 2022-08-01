import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    photo: {
        type: Buffer,
        required: false,
    },
    joinedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

EventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
        if (doc.photo !== undefined) {
            const base64 = doc.photo.toString('base64');
            const res = ret;
            res.photo = `data:image/png;base64,${base64}`;

            return res;
        } else {
            return ret;
        }
    },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
