import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TenorCategories } from '../../utils/GlobalInterfaces';
import { TENOR_KEY } from '../../config';

interface GifSliceState{
    searchTerm: string;
    preview: boolean;
    next: string;
    gifs: string[];
    gifCatergories: TenorCategories[];
    loading: boolean;
    error: boolean;
}

const initialState: GifSliceState = {
    searchTerm: "",
    preview: true,
    next: "",
    gifs: [],
    gifCatergories: [],
    loading: false,
    error: false
}

export const fetchGifCategories = createAsyncThunk(
    'gif/categories',
    async(payload, thunkAPI) => {
        try {
            let clientKey = 'fwitter';
            let url = `https://tenor.googleapis.com/v2/categories?key=${TENOR_KEY}&client_key=${clientKey}`;

            let res = await axios.get(url);

            let data = [];

            for(let i = 0; i < 8; i++){
                data.push(res.data.tags[i]);
            }

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const GifSlice = createSlice({
    name: "gif",
    initialState,
    reducers: {
        updateSearchTerms(state, action:PayloadAction<string>){
            state = {
                ...state,
                searchTerm: action.payload
            }

            return state;
        },

        updatePreview(state, action:PayloadAction<boolean>){
            state = {
                ...state,
                preview: action.payload
            }
            return state;
        },

        clearGifs(state){
            state = {
                ...state,
                gifs: []
            }

            return state;
        }        
    },

    extraReducers: (builder) => {
        builder.addCase(fetchGifCategories.fulfilled, (state, action) => {
            state = {
                ...state, 
                loading: false,
                gifCatergories: action.payload
            }

            return state;
        });

        builder.addMatcher(isPending, (state, action) => {
            state = {
                ...state,
                loading: true
            };
            return state;
        });

        builder.addMatcher(isRejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            };
            return state;
        });
    }
});

export const {updateSearchTerms, updatePreview, clearGifs} = GifSlice.actions;

export default GifSlice.reducer;