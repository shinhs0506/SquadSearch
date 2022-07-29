import Event from '../models/event.js';
import User from '../models/user.js';

const getAllEvents = async (req, res) => {
    try {
        const { query } = req.query;
        if (query) {
            const events = await Event.find({ name: { $regex: query, $options: 'i' } });
            return res.send(events);
        }
        const events = await Event.find({});
        return res.send(events);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while retrieving events' });
    }
};

const getAllEventsContainingName = async (req, res) => {
    try {
        const { query } = req.query;
        const events = await Event.find({ name: { $regex: query, $options: 'i' } });
        return res.send(events);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while filtering events' });
    }
};

const createEvent = async (req, res) => {
    const { name, location, date } = req.body;

    try {
        const event = await Event.create({
            name,
            location,
            date,
        });
        return res.send(event);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating an event, please try again' });
    }
};

const deleteEventByID = async (req, res) => {
    const { id } = req.params;

    try {
        await Event.findByIdAndRemove(id);
        return res.send(id);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while deleting an event' });
    }
};

const joinEvent = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    console.log(email);

    try {
        const user = await User.findOne({ email }).orFail();
        const event = await Event.findByIdAndUpdate(id, {
            $addToSet: { joinedUsers: user },
        }, {
            new: true,
        });
        return res.send(event);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while joining an event' });
    }
};

const leaveEvent = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    try {
        const user = await User.findOne({ email }).orFail();
        const event = await Event.findByIdAndUpdate(id, {
            $pullAll: {
                joinedUsers: [user._id],
            },
        }, {
            new: true,
        });
        return res.send(event);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while leaving an event' });
    }
};

export default {
    getAllEvents, getAllEventsContainingName, createEvent, deleteEventByID, joinEvent, leaveEvent,
};
