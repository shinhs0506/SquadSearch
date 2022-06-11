import { configureStore } from '@reduxjs/toolkit'
import eventReducer from 'redux/slices/eventSlice'
import profileReducer from 'redux/slices/profileSlice'

const store = configureStore({
    reducer: {
        event: eventReducer,
        profile: profileReducer
    }
})

export default store
