import { axios, setHeader } from './axios';

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

    static async createEvent(name, location, date, eventPhoto) {
        const res = await axios.post(
            '/events',
            {
                name, location, date, eventPhoto,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return res;
    }

    static async deleteEventByID(id) {
        const res = await axios.delete(`/event/${id}`, { id });
        return res;
    }

    static async join(id, email) {
        const res = await axios.post(`/event/${id}/join`, { email });
        return res;
    }

    static async leave(id, email) {
        const res = await axios.post(`/event/${id}/leave`, { email });
        return res;
    }

    static async getProfilePictures(id) {
        const res = await axios.get(`/event/${id}/profilePictures`);
        return res;
    }
}

export default EventAPI;
