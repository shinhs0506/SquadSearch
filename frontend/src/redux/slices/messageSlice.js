import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MessageAPI from 'service/api/messageApi';

const getMessagesByChatId = createAsyncThunk(
    'messages/getByChatId',
    async (input, thunkAPI) => {
        try {
            const id = input;
            const res = await MessageAPI.getMessagesByChatId(id);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const createMessage = createAsyncThunk(
    'messages/create',
    async (input, thunkAPI) => {
        try {
            const { chatId, sender, text } = input;
            const res = await MessageAPI.createMessage(chatId, sender, text);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        messages: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getMessagesByChatId.fulfilled, (state, action) => {
            state.messages = action.payload;
        });
        builder.addCase(createMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
        });
    },
});

export const messageSliceActions = {
    getMessagesByChatId, createMessage, ...messageSlice.actions,
};
export default messageSlice.reducer;
