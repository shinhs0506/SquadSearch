import { createSlice, current } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        profiles: [],
    },
    reducers: {
        createProfile: (state, action) => {
            state.profiles.push(action.payload);
            console.log(current(state.profiles));
        },
        editProfile: (state, action) => {
            const index = state.profiles.findIndex((el) => el.username === action.payload.username);
            console.log('In edit');
            console.log(index);
            state.profiles[index] = action.payload;
            console.log(current(state.profiles));
        },
    },
});

export const { createProfile, editProfile } = profileSlice.actions;
export default profileSlice.reducer;
