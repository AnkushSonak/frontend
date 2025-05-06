import { createSlice } from "@reduxjs/toolkit";

interface ModlaSliceState{
    displayEditPostImage: boolean;
    displayTagPeople: boolean;
}

const initialState: ModlaSliceState = {
    displayEditPostImage: false,
    displayTagPeople: false
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
        },

        updateDisplayTagPeople(state){
            state = {
                ...state,
                displayTagPeople: !state.displayTagPeople
            }
        }
    }
});

export const {updateDisplayEditPostImage, updateDisplayTagPeople} = ModlaSlice.actions;

export default ModlaSlice.reducer;