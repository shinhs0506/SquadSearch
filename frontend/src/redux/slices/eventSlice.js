import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EventAPI from 'service/api/eventApi';

const getAllEvents = createAsyncThunk(
    'event/getAll',
    async (input, thunkAPI) => {
        try {
            const res = await EventAPI.getAllEvents();
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const createEvent = createAsyncThunk(
    'event/create',
    async (input, thunkAPI) => {
        try {
            const { body } = input;
            const name = body.get('name');
            const date = body.get('date');
            const location = body.get('location');
            const eventPhoto = body.get('eventPhoto');

            const res = await EventAPI.createEvent(name, location, date, eventPhoto);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const deleteEventByID = createAsyncThunk(
    'event/deleteByID',
    async (input, thunkAPI) => {
        try {
            const { _id } = input;
            const res = await EventAPI.deleteEventByID(_id);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const filterEventByQuery = createAsyncThunk(
    'event/filterByQuery',
    async (input, thunkAPI) => {
        try {
            const { searchQuery } = input;
            const res = await EventAPI.getAllEventsContainingName(searchQuery);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const joinEvent = createAsyncThunk(
    'event/join',
    async (input, thunkAPI) => {
        try {
            const { _id, email } = input;
            const res = await EventAPI.join(_id, email);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const leaveEvent = createAsyncThunk(
    'event/leave',
    async (input, thunkAPI) => {
        try {
            const { _id, email } = input;
            const res = await EventAPI.leave(_id, email);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const addChat = createAsyncThunk(
    'event/addChat',
    async (input, thunkAPI) => {
        try {
            const { eventId, chatId } = input;
            const res = await EventAPI.addChat(eventId, chatId);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const getAllChats = createAsyncThunk(
    'event/getAllChats',
    async (input, thunkAPI) => {
        try {
            const res = await EventAPI.getAllChats(input);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        events: [],
        message: '',
    },
    reducers: {
        filterEvents: (state, action) => {
            state.events = state.events.filter(
                (event) => event.name.toLowerCase().includes(action.payload.toLowerCase()),
            );
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEvents.fulfilled, (state, action) => {
            state.events = action.payload;
        });
        builder.addCase(getAllEvents.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.events.push(action.payload);
            state.message = `Successfully created ${action.payload.name} event`;
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(deleteEventByID.fulfilled, (state, action) => {
            state.events = state.events.filter((event) => event._id !== action.payload);
            state.message = 'Successsfully deleted an event';
        });
        builder.addCase(deleteEventByID.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(filterEventByQuery.fulfilled, (state, action) => {
            state.events = action.payload;
        });
        builder.addCase(filterEventByQuery.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(joinEvent.fulfilled, (state, action) => {
            const idx = state.events.map((event) => event._id).indexOf(action.payload._id);
            if (idx !== -1) {
                state.events[idx] = action.payload;
            }
            state.message = 'Successfully joined an event';
        });
        builder.addCase(joinEvent.rejected, (state, action) => {
            state.message = 'Error occured while joining an event';
        });
        builder.addCase(leaveEvent.fulfilled, (state, action) => {
            const idx = state.events.map((event) => event._id).indexOf(action.payload._id);
            if (idx !== -1) {
                state.events[idx] = action.payload;
            }
            state.message = 'Successfully left an event';
        });
        builder.addCase(leaveEvent.rejected, (state, action) => {
            state.message = 'Error occured while leaving an event';
        });
    },
});

export const eventSliceActions = {
    getAllEvents,
    filterEventByQuery,
    createEvent,
    deleteEventByID,
    joinEvent,
    leaveEvent,
    addChat,
    getAllChats,
    ...eventSlice.actions,
};
export default eventSlice.reducer;
