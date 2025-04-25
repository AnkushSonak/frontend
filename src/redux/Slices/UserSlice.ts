import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/GlobalInterfaces";
import axios from 'axios'
import { AcUnit, Email } from "@mui/icons-material";
import { StringLiteral } from "typescript";

interface USerSliceState{
    loggedIn: User | undefined;
    username: string;
    token: string;
    fromRegister: boolean;
    error: boolean;
}

interface LoginBody{
    username: string;
    password: string;
}

interface VerifyUserBody {
    email: String;
    phone: string;
    username: string;
}

const initialState: USerSliceState = {
    loggedIn: undefined,
    username: '',
    token: '',
    fromRegister: false,
    error: false
};

export const loginUser = createAsyncThunk(
    'user/login',
    async(body: LoginBody, thunkAPI) => {
        try {
            const req = await axios.post('http://localhost:8000/auth/login', body);
            return req.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }    
)

export const VerifyUsername = createAsyncThunk(
    'user/username',
    async(body: VerifyUserBody, thunkAPI) => {
        try {
            const req = await axios.post('http://localhost:8000/auth/find', body);
            return req.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFromRegister(state, action:PayloadAction<boolean>){
            state = {
                ...state,
                fromRegister: action.payload
            }

            return state;
        },

        resetUsername(state){
            state= {
                ...state,
                username: ''
            };
            return state;
        },

        setToken(state, action:PayloadAction<string>){
            state = {
                ...state,
                error: true
            };

            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state = {
                ...state,
                loggedIn: {
                    userId: action.payload.user.userId,
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email,
                    phone: action.payload.user.phone,
                    dateOfBireth: action.payload.user.dateOfBireth,
                    username: action.payload.user.username,
                    bio: action.payload.user.bio,
                    nickname: action.payload.user.nickname,
                    profilePicture: action.payload.user.profilePicture,
                    bannerPicture: action.payload.user.bannerPicture,
                },
                token: action.payload.token
            }
            return state;
        });
        
        builder.addCase(VerifyUsername.fulfilled,  (state, action) => {
            state = {
                ...state,
                username: action.payload
            };
            return state;
        });

        builder.addCase(loginUser.pending, (state, action) => {
            state ={
                ...state,
                error: false
            }
            return state;
        });

        builder.addCase(VerifyUsername.pending,  (state, action) => {
            state = {
                ...state,
                error: false
            };
            return state;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state = {
                ...state,
                error: true
            }
            return state;
        });

        builder.addCase(VerifyUsername.rejected,  (state, action) => {
            state = {
                ...state,
                error: true
            };
            return state;
        });
    }
});

export const {setFromRegister, resetUsername, setToken} = UserSlice.actions;

export default UserSlice.reducer;