import { configureStore } from '@reduxjs/toolkit';
import eventReducer from 'redux/slices/eventSlice';
import authReducer from 'redux/slices/authSlice';
import chatReducer from 'redux/slices/chatSlice';

const store = configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
