import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, User } from "../../utils/GlobalInterfaces";
import { Schedule } from "@mui/icons-material";
import axios from 'axios'

export interface PostSliceState{
    loading: boolean;
    error: boolean;
    currentPost: Post | undefined;
    posts: Post[];
    currentPostImages: string[];
}

interface updatePostPayload{
    name: string;
    value: string | number | boolean     
}

const initialState:PostSliceState = {
    loading: false,
    error: false,
    currentPost: undefined,
    posts: [],
    currentPostImages: []
}

interface CreatePostBody{
    content: string;
    author: User;
    replies: Post[];
    scheduled: boolean;
    scheduledDate: Date | undefined;
    audience: 'EVERYONE' | 'CIRCLE';
    replyRestriction: 'EVERYONE' | 'FOLLOW' | 'CIRCLE' | 'MENTION';
    token: string;
}

export const createPost = createAsyncThunk(
    'post/create',
    async(body:CreatePostBody, thunkAPI) => {
        try {
            let post = {
                content: body.content,
                author: body.author,
                replies: [],
                scheduled: body.scheduled,
                scheduledDate: body.scheduledDate,
                audience: body.audience,
                replyRestriction: body.replyRestriction,
            }
            const req = await axios.post('http://localhost:8000/posts/', post, {
                headers: {
                    "Authorization": `Bearer ${body.token}`
                }
            });

            return req.data;
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        initializeCurrentPost(state, action:PayloadAction<Post>){
            if(!state.currentPost){
                state.currentPost = action.payload;
            }else{
                state ={
                    ...state,
                    currentPost: action.payload
                }
            }
            return state;
        },

        updateCurrentPost(state, action:PayloadAction<updatePostPayload>){
            if(state.currentPost){
                state.currentPost = {
                    ...state.currentPost,
                    [action.payload.name]: action.payload.value
                }
            }
            return state;
        },

        updateCurrentPostImages(state, action:PayloadAction<string[]>){
            state = {
                ...state,
                currentPostImages: action.payload
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            }

            return state;
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            let post: Post = action.payload;

            state = {
                ...state,
                posts: [post, ...state.posts],
                loading: false,
                error: false,
                currentPost: undefined
            }
            return state;
        });

        builder.addCase(createPost.rejected, (state, action) => {

            state = {
                ...state,
                error: true
            }
            return state;
        });

    }
})

export const {initializeCurrentPost, updateCurrentPost, updateCurrentPostImages} = PostSlice.actions;

export default PostSlice.reducer;