import { configureStore } from '@reduxjs/toolkit'
import eventReducer from 'redux/slices/eventSlice'

const store = configureStore({
    reducer: eventReducer
})

export default store
