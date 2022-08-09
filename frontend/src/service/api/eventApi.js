import { axios, setHeader } from './axios';

class EventAPI {
    static async getAllEvents() {
        setHeader();
        const res = await axios.get('/events');
        return res;
    }

    static async getAllEventsContainingName(query) {
        setHeader();
        const res = await axios.get('/events', {
            params: {
                query,
            },
        });
        return res;
    }

    static async createEvent(name, location, date, eventPhoto) {
        setHeader();
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
        setHeader();
        const res = await axios.delete(`/event/${id}`, { id });
        return res;
    }

    static async join(id, email) {
        setHeader();
        const res = await axios.post(`/event/${id}/join`, { email });
        return res;
    }

    static async leave(id, email) {
        setHeader();
        const res = await axios.post(`/event/${id}/leave`, { email });
        return res;
    }

    static async getProfilePictures(id) {
        setHeader();
        const res = await axios.get(`/event/${id}/profilePictures`);
        return res;
    }

    static async addChat(eventId, chatId) {
        setHeader();
        const res = await axios.post(`/event/${eventId}/addChat`, { chatId });
        return res;
    }

    static async getAllChats(eventId) {
        setHeader();
        const res = await axios.get(`/event/${eventId}/getAllChats`);
        return res;
    }
}

export default EventAPI;
