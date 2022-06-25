import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        profiles: [],
    },
    reducers: {
        createProfile: (state, action) => {
            state.profiles.push(action.payload);
        },
        editProfile: (state, action) => {
            const index = state.profiles.findIndex((el) => el.username === action.payload.username);
            state.profiles[index] = action.payload;
        },
    },
});

export const { createProfile, editProfile } = profileSlice.actions;
export default profileSlice.reducer;
