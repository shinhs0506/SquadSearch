import { configureStore } from '@reduxjs/toolkit';
import eventReducer from 'redux/slices/eventSlice';
import authReducer from 'redux/slices/authSlice';
import chatReducer from 'redux/slices/chatSlice';
import userReducer from 'redux/slices/userSlice';

const store = configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
        chat: chatReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
