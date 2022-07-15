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
            const { name, location, date } = input;
            const res = await EventAPI.createEvent(name, location, date);
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

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        events: [],
    },
    reducers: {
        filterEvents: (state, action) => {
            state.events = state.events.filter(
                (event) => event.name.toLowerCase().includes(action.payload.toLowerCase()),
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEvents.fulfilled, (state, action) => {
            state.events = action.payload;
        });
        builder.addCase(getAllEvents.rejected, (state, action) => {
            console.log(action.payload.response.data.message);
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.events.push(action.payload);
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            console.log(action.payload.response.data.message);
        });
        builder.addCase(deleteEventByID.fulfilled, (state, action) => {
            state.events = state.events.filter((event) => event._id !== action.payload);
        });
        builder.addCase(deleteEventByID.rejected, (state, action) => {
            console.log(action.payload.response.data.message);
        });
        builder.addCase(filterEventByQuery.fulfilled, (state, action) => {
            state.events = action.payload;
        });
        builder.addCase(filterEventByQuery.rejected, (state, action) => {
            console.log(action.payload.response.data.message);
        });
    },
});

export const eventSliceActions = {
    getAllEvents, createEvent, deleteEventByID, filterEventByQuery,
};
export default eventSlice.reducer;
