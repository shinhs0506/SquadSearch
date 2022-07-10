import { configureStore } from '@reduxjs/toolkit';
import eventReducer from 'redux/slices/eventSlice';
import authReducer from 'redux/slices/authSlice';

const store = configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
    },
});

export default store;
