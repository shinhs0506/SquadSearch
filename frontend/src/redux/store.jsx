import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import eventReducer from 'redux/slices/eventSlice';
import authReducer from 'redux/slices/authSlice';

const store = configureStore({
    reducer: {
        event: eventReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;
