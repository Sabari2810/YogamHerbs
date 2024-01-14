import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICartItem, IUpdateCartItem } from "@/types/types";

type CartState = {
    totalItems: number;
    items: ICartItem[];
    couponApplied: boolean;
    couponDiscount: number;
};

const initialState = {
    totalItems: 0,
    items: [],
    couponApplied: false,
    couponDiscount: 0
} as CartState;

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: () => structuredClone(initialState),
        increaseCartCount: (state, action: PayloadAction<number>) => {
            state.totalItems += action.payload;
        },
        setCartCount: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        deleteCartItem: (state) => {
            state.totalItems -= 1;
        },
        setCartItems: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = action.payload
        },
        updateCartItem: (state, action: PayloadAction<IUpdateCartItem>) => {
            const currentItem = state.items.find((item) => item.ProductVariantId === action.payload.product_variant_id);
            const price = currentItem?.DiscountPrice ?? currentItem?.Price
            if (action.payload.action === "INCREMENT") {
                currentItem!.Quantity += 1;
                state.totalItems += 1;
                currentItem!.TotalPrice = Number((currentItem!.TotalPrice + price!).toFixed(2))
            }
            else {
                currentItem!.Quantity -= 1;
                state.totalItems -= 1;
                currentItem!.TotalPrice =
                    currentItem!.Quantity > 0 ? Number((currentItem!.TotalPrice - price!).toFixed(2)) : 0

            }
        }
    },
});

export const {
    increaseCartCount,
    deleteCartItem,
    setCartCount,
    setCartItems,
    updateCartItem,
    resetCart
} = cart.actions;

export const selectCartTotalCount = (state: RootState) => state.CartReducer.totalItems;
export const selectCartItems = (state: RootState) => state.CartReducer.items;
export const selectCouponApplied = (state: RootState) => state.CartReducer.couponApplied;

export default cart.reducer;