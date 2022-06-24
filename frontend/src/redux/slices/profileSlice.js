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
    },
});

export const { createProfile } = profileSlice.actions;
export default profileSlice.reducer;
