import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        events: [
            { name: 'Elmo', date: '2020-06-21', location: 'here' },
            { name: 'Ping Pong', date: '2022-06-10', location: 'Alaska' },
            { name: 'Ariana Grande', date: '2022-06-23', location: 'Rogers Arena' },
        ],
    },
    reducers: {
        createEvent: (state, action) => {
            state.events.push(action.payload);
        },
        filterEvents: (state, action) => {
            state.events = state.events.filter(
                (event) => event.name.toLowerCase().includes(action.payload.toLowerCase()),
            );
        },
    },
});

export const { createEvent, filterEvents } = eventSlice.actions;
export default eventSlice.reducer;
