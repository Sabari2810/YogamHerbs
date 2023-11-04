import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type DrawerState = {
    isOpen: boolean
}

const initialState: DrawerState = {
    isOpen: false,
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setIsDrawerOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setIsDrawerOpen } = drawerSlice.actions;

export const selectDrawerState = (state: RootState) => state.DrawerReducer.isOpen;

export default drawerSlice.reducer;