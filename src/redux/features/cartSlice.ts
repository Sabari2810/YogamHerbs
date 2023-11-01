import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICartItem, IUpdateCartItem } from "@/types/types";

type CartState = {
    value: number;
    items: ICartItem[]
};

const initialState = {
    value: 0,
    items: []
} as CartState;

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reset: () => structuredClone(initialState),
        addCartItem: (state) => {
            state.value += 1;
        },
        setCartCount: (state, action: PayloadAction<number>) => {
            console.log(action.payload);
            state.value = action.payload
        },
        deleteCartItem: (state) => {
            state.value -= 1;
        },
        setCartItems: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = action.payload
        },
        updateCartItem: (state, action: PayloadAction<IUpdateCartItem>) => {
            const currentItem = state.items.find((item) => item.ProductVariantId === action.payload.product_variant_id);
            if (action.payload.action === "INCREMENT") {
                currentItem!.Quantity += 1;
                state.value += 1;
                currentItem!.TotalPrice = Number((currentItem!.TotalPrice + currentItem!.Price).toFixed(2))
            }
            else {
                currentItem!.Quantity -= 1;
                state.value -= 1;
                currentItem!.TotalPrice = Number((currentItem!.TotalPrice - currentItem!.Price).toFixed(2))
            }
        }
    },
});

export const {
    addCartItem,
    deleteCartItem,
    setCartCount,
    setCartItems,
    updateCartItem
} = cart.actions;

export const selectCartValue = (state: RootState) => state.CartReducer.value;
export const selectCartItems = (state: RootState) => state.CartReducer.items;

export default cart.reducer;