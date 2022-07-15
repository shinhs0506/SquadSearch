import Event from '../models/event.js';

const getAllEvents = async (req, res) => {
    try {
        const { query } = req.query;
        if (query) {
            const events = await Event.find({ name: { $regex: query, $options: 'i' } });
            return res.send(events);
        }
        const events = await Event.find({});
        return res.send({
            data: events,
            message: 'Successfully retrieved all events',
        });
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while retrieving events' });
    }
};

const getAllEventsContainingName = async (req, res) => {
    try {
        const { query } = req.query;
        const events = await Event.find({ name: { $regex: query, $options: 'i' } });
        return res.send({
            data: events,
            message: `Successfully retrieved events with name containing ${query}`,
        });
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
        return res.send({
            data: event,
            message: `Successfully created an ${name} event`,
        });
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while creating an event, please try again' });
    }
};

const deleteEventByID = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndRemove(id);
        return res.send({
            data: id,
            message: `Successfully deleted an ${event.name} event`,
        });
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while deleting an event, please try again' });
    }
};

export default {
    getAllEvents, getAllEventsContainingName, createEvent, deleteEventByID,
};
