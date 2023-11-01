import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProductVariant } from "@/types/types";

type ProductState = {
    variants: IProductVariant[];
    currentVariant: IProductVariant | undefined;
    currentVariantQuantity: number;
};

const initialState = {
    variants: [],
    currentVariant: undefined,
    currentVariantQuantity: 0
} as ProductState;

export const { actions, reducer } = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: () => initialState,
        setProductVariants: (state, action: PayloadAction<IProductVariant[]>) => {
            state.variants = action.payload;
            state.currentVariant = state.variants.find((variant) => variant.IsDefault);
            state.currentVariantQuantity = 0
        },
        setCurrentVariant: (state, action: PayloadAction<IProductVariant>) => {
            state.currentVariant = action.payload;
        },
        incrementVariantQuantity: (state) => {
            state.currentVariantQuantity += 1
        },
        decrementVariantQuantity: (state) => {
            state.currentVariantQuantity = state.currentVariantQuantity === 0 ? 0 : state.currentVariantQuantity - 1
        }
    },
});

export const {
    setProductVariants,
    setCurrentVariant,
    incrementVariantQuantity,
    decrementVariantQuantity
} = actions;

export const selectCurrentVariant = (state: RootState) => state.ProductReducer.currentVariant;
export const selectVariants = (state: RootState) => state.ProductReducer.variants;
export const selectCurrentVariantQuantity = (state: RootState) => state.ProductReducer.currentVariantQuantity;

export default reducer;