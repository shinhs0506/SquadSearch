import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import AuthAPI from 'service/api/authApi';

const loginUser = createAsyncThunk(
    'auth/login',
    async (input, thunkAPI) => {
        try {
            const { email, password } = input;
            const res = await AuthAPI.loginUser(email, password);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const signupUser = createAsyncThunk(
    'auth/signup',
    async (input, thunkAPI) => {
        try {
            const { name, email, password } = input;
            const res = await AuthAPI.signupUser(name, email, password);
            return res.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isLoggedIn: false,
        isSignningUp: false,
        name: '',
        email: '',
        message: '',
    },
    reducers: {
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.message = `see you again ${state.name}`;
            state.name = '';
            state.email = '';
        },
        setIsSignningUp: (state, action) => {
            state.isSignningUp = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            const decodedData = jwtDecode(`${action.payload.data.tokenHeader}.${action.payload.data.tokenBody}`);
            state.name = decodedData.name;
            state.email = decodedData.email;
            state.message = action.payload.message;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isSignningUp = true;
            state.message = action.payload.data.message;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
    },
});

export const authSliceActions = { loginUser, signupUser, ...authSlice.actions };
export default authSlice.reducer;
