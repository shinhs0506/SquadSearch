import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthAPI from 'service/api/authApi';

const loginUser = createAsyncThunk(
    'auth/login',
    async(input, thunkAPI) => {
        try {
            let { email, password } = input;
            let data = await AuthAPI.loginUser(email, password);
            return data;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

const signupUser = createAsyncThunk(
    'auth/signup',
    async(input, thunkAPI) => {
        try {
            let { name, email, password } = input;
            const data = await AuthAPI.signupUser(name, email, password);
            return data;
        } catch(e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        isLoggedIn: false,
        isSignningUp: false,
        name: '',
        email: '',
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
        logout: (state, action) => {
            state.isLoggedIn = false,
            state.name = '',
            state.email = ''
        },
        setIsSignningUp: (state, action) => {
            state.isSignningUp = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoggedIn = true,
            state.name = action.name,
            state.email = action.email
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log('login failed', action.payload.response.data.message)
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isSignningUp = true
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            console.log('signup failed', action.payload.response.data.message)
        })
    }
});

export const profileActions = { loginUser, signupUser, ...profileSlice.actions };
export default profileSlice.reducer;
