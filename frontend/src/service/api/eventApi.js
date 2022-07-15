import axios from './axios';

class EventAPI {
    static async getAllEvents() {
        const res = await axios.get('/events');
        return res;
    }

    static async getAllEventsContainingName(query) {
        const res = await axios.get('/events', {
            params: {
                query,
            },
        });
        return res;
    }

    static async createEvent(name, location, date) {
        const res = await axios.post('/events', { name, location, date });
        return res;
    }

    static async deleteEventByID(id) {
        const res = await axios.delete(`/event/${id}`, { id });
        return res;
    }
}

export default EventAPI;
