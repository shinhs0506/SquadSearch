import { configureStore } from '@reduxjs/toolkit'
import eventReducer from 'redux/slices/eventSlice'
import newEventReducer from './slices/newEventSlice'

const store = configureStore({
    reducer: {
        event: eventReducer,
        newEvent: newEventReducer
    }
})

export default store
