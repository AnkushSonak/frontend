import { createSlice } from "@reduxjs/toolkit";

interface ModlaSliceState{
    displayEditPostImage: boolean;
}

const initialState: ModlaSliceState = {
    displayEditPostImage: false
}

export const ModlaSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        updateDisplayEditPostImage(state){
            state = {
                ...state,
                displayEditPostImage: !state.displayEditPostImage
            }

            return state;
        }
    }
});

export const {updateDisplayEditPostImage} = ModlaSlice.actions;

export default ModlaSlice.reducer;