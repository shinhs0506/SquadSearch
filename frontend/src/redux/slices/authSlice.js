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

const logoutUser = createAsyncThunk(
    'auth/logout',
    async (input, thunkAPI) => {
        try {
            const { email } = input;
            const res = await AuthAPI.logoutUser(email);
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
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const updateUser = createAsyncThunk(
    'auth/update',
    async (input, thunkAPI) => {
        try {
            const { email, body } = input;
            const name = body.get('name');
            const password = body.get('password');
            const profilePicture = body.get('profilePicture');
            const bio = body.get('bio');
            const res = await AuthAPI.updateUser(email, name, password, profilePicture, bio);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isLoggedIn: false,
        isSignningUp: false,
        user: null,
        message: '',
    },
    reducers: {
        setIsSignningUp: (state, action) => {
            state.isSignningUp = action.payload;
        },
        setLoginWithToken: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            const decodedData = jwtDecode(`${action.payload.tokenHeader}.${action.payload.tokenBody}`);
            state.user = decodedData.user;
            state.message = `Welcome back ${state.name}`;
            localStorage.setItem('tokenHeader', action.payload.tokenHeader);
            localStorage.setItem('tokenBody', action.payload.tokenBody);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isSignningUp = true;
            state.message = 'Successfully created an account';
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isSignningUp = true;
            state.message = `see you again ${state.name}`;
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('tokenHeader');
            localStorage.removeItem('tokenBody');
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const decodedData = jwtDecode(`${action.payload.tokenHeader}.${action.payload.tokenBody}`);
            state.user = decodedData.user;
            state.message = 'successfully updated name';
            localStorage.setItem('tokenHeader', action.payload.tokenHeader);
            localStorage.setItem('tokenBody', action.payload.tokenBody);
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.message = action.payload.response.data.message;
        });
    },
});

export const authSliceActions = {
    loginUser, signupUser, logoutUser, updateUser, ...authSlice.actions,
};
export default authSlice.reducer;
