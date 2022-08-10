import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserAPI from 'service/api/userApi';

const getProfile = createAsyncThunk(
    'users/getProfile',
    async (input, thunkAPI) => {
        try {
            const res = await UserAPI.getProfile(input);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        detailedProfile: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.detailedProfile = action.payload;
        });
    },
});

export const userSliceActions = {
    getProfile,
    ...userSlice.actions,
};
export default userSlice.reducer;
