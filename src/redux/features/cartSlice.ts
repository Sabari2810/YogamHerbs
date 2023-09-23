import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartState = {
    value: number;
};

const initialState = {
    value: 0,
} as CartState;

export const counter = createSlice({
    name: "counter",
    initialState,
    reducers: {
        reset: () => initialState,
        addCartItem: (state) => {
            state.value += 1;
        },
        setCartItem: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
        deleteCartItem: (state) => {
            state.value -= 1;
        }
    },
});

export const {
    addCartItem,
    deleteCartItem,
    setCartItem
} = counter.actions;

export const selectCartValue = (state: RootState) => state.CartReducer.value;

export default counter.reducer;