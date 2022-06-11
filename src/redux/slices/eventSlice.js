import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        events: [{Name: "Elmo", Date: "2020-06-21", Location: "here"}, {Name: "Ping Pong", Date: "2022-06-10", Location: "Alaska"}]
    },
    reducers: {
        createEvent: (state, action) => {
            state.events.push(action.payload)
        }
    }
})

export const {createEvent} = eventSlice.actions
export default eventSlice.reducer
