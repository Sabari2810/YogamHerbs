import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICategory, IProduct } from "@/types/types";

type ProductsState = {
    products: IProduct[];
    productCategories: ICategory[];
    currentPage: number;
};

const initialState = {
    products: [],
    productCategories: [],
    currentPage: 1
} as ProductsState;

export const { actions, reducer } = createSlice({
    name: "products",
    initialState,
    reducers: {
        reset: () => initialState,
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.productCategories = action.payload;
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        }
    },
});

export const {
    setProducts,
    setCategories,
    changePage
} = actions;

export const selectPageProducts = (state: RootState) => state.ProductsReducer.products;
export const selectCategories = (state: RootState) => state.ProductsReducer.productCategories;
export const selectCurrentPage = (state: RootState) => state.ProductsReducer.currentPage;

export default reducer;