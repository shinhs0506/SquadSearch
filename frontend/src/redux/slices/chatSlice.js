import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatAPI from 'service/api/chatApi';

const getAllChatsWithUser = createAsyncThunk(
    'chats/getByUserId',
    async (input, thunkAPI) => {
        try {
            const id = input;
            const res = await ChatAPI.getAllChatsWithUser(id);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const createChat = createAsyncThunk(
    'chats/create',
    async (input, thunkAPI) => {
        try {
            const { name, members } = input;
            console.log(input);
            console.log(name, members);
            const res = await ChatAPI.createChat(name, members);
            console.log(res.data);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState: {
        chats: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllChatsWithUser.fulfilled, (state, action) => {
            state.chats = action.payload;
        });
        builder.addCase(createChat.fulfilled, (state, action) => {
            state.chats.push(action.payload);
        });
    },
});

export const chatSliceActions = {
    getAllChatsWithUser, createChat, ...chatSlice.actions,
};
export default chatSlice.reducer;
