import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatAPI from 'service/api/chatApi';

const getAllChats = createAsyncThunk(
    'chats/getAll',
    async (input, thunkAPI) => {
        try {
            const res = await ChatAPI.getAllChats();
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const getAllChatsWithUser = createAsyncThunk(
    'chats/getByUserId',
    async (input, thunkAPI) => {
        try {
            const chatId = input;
            const res = await ChatAPI.getAllChatsWithUser(chatId);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const createChat = createAsyncThunk(
    'chats/createChat',
    async (input, thunkAPI) => {
        try {
            const { name, members } = input;
            const res = await ChatAPI.createChat(name, members);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const createMessage = createAsyncThunk(
    'chats/createMessage',
    async (input, thunkAPI) => {
        try {
            const { chatId, sender, text } = input;
            const res = await ChatAPI.createMessage(chatId, sender, text);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const getAllMessages = createAsyncThunk(
    'chats/getAllMessages',
    async (input, thunkAPI) => {
        try {
            const res = await ChatAPI.getAllMessages(input);
            return { input, res };
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const joinChats = createAsyncThunk(
    'chats/joinChat',
    async (input, thunkAPI) => {
        try {
            const { _id, email } = input;
            const res = await ChatAPI.joinChat(_id, email);
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
        builder.addCase(getAllChats.fulfilled, (state, action) => {
            state.chats = action.payload;
        });
        builder.addCase(getAllChatsWithUser.fulfilled, (state, action) => {
            state.chats = action.payload;
        });
        builder.addCase(createChat.fulfilled, (state, action) => {
            state.chats.push(action.payload);
        });
        builder.addCase(createMessage.fulfilled, (state, action) => {
            const index = state.chats.findIndex((chat) => chat._id === action.payload._id);
            const temp = state.chats;
            temp[index] = action.payload;
            state.chats = temp;
        });
        /*
        builder.addCase(getAllMessages.fulfilled, (state, action) => {
            const index = state.chats.findIndex((chat) => chat._id === action.payload.input);
            const temp = state.chats;
            temp[index].messages = action.payload.res.data;
            state.chats = temp;
        });
        */
    },
});

export const chatSliceActions = {
    getAllChats,
    getAllChatsWithUser,
    createChat,
    createMessage,
    getAllMessages,
    joinChats,
    ...chatSlice.actions,
};
export default chatSlice.reducer;
