import { createSlice } from '@reduxjs/toolkit'

const newEventSlice = createSlice({
    name: 'newEventSlice',
    initialState: {
        events: []
    },
    reducers: {
        newEvent: (state, action) => {
            state.events.push(action.payload)
        }
    }
})

export const {newEvent} = newEventSlice.actions
export default newEventSlice.reducer
