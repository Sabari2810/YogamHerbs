import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICategory, IProduct, IProductList } from "@/types/types";

type ProductsState = {
    products: IProduct[] | null;
    total_pages: number;
    productCategories: ICategory[] | null;
    currentPage: number;
};

const initialState = {
    products: null,
    productCategories: [],
    currentPage: 1,
    total_pages: 1
} as ProductsState;

export const { actions, reducer } = createSlice({
    name: "products",
    initialState,
    reducers: {
        reset: () => initialState,
        setProducts: (state, action: PayloadAction<IProduct[] | null>) => {
            state.products = action.payload
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.total_pages = action.payload
        },
        setCategories: (state, action: PayloadAction<ICategory[] | null>) => {
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
    setTotalPages,
    changePage
} = actions;

export const selectPageProducts = (state: RootState) => state.ProductsReducer.products;
export const selectCategories = (state: RootState) => state.ProductsReducer.productCategories;
export const selectCurrentPage = (state: RootState) => state.ProductsReducer.currentPage;
export const selectTotalPages = (state: RootState) => state.ProductsReducer.total_pages;

export default reducer;