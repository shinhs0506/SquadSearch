import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "eventSlice",
  initialState: {
    events: [
      { name: "Elmo", date: "2020-06-21", location: "here" },
      { name: "Ping Pong", date: "2022-06-10", location: "Alaska" },
      { name: "Ariana Grande", date: "2022-06-23", location: "Rogers Arena" },
    ],
  },
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    filterEvents: (state, action) => {
      state.events = state.events.filter((event) =>
        event.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    deleteEvents: (state, action) => {
      console.log(action.payload);
      let c = 0;
      for (let i of state.events) {
        if (action.payload.Name === i.name && action.payload.Date === i.date) {
          state.events.splice(c, 1);
          break;
        }
        c++;
      }
    },
  },
});

export const { createEvent, filterEvents, deleteEvents } = eventSlice.actions;
export default eventSlice.reducer;
