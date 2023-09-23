import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import { IProduct } from "@/types/types";
import { RootState } from "../store";

interface State {
    products: IProduct[],
    pending: boolean,
    error: boolean,
    errorMessage: string
}

const initialState: State = {
    products: [],
    pending: false,
    error: false,
    errorMessage: "",
}

export const GetProducts = createAsyncThunk("GetProducts", async (obj, { rejectWithValue, fulfillWithValue }) => {
    try {
        const response: Response = await fetch(process.env.API_URL ?? "" + "/api/product");
        if (response.ok) {
            const data = await response.json();
            return fulfillWithValue(data);
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const productsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(GetProducts.pending, (state) => {
            state.pending = true;
        }).addCase(GetProducts.fulfilled, (state, { payload }) => {
            state.pending = false;
            state.products = payload;
        }).addCase(GetProducts.rejected, (state, { payload }) => {
            state.error = true;
            state.pending = false;
            state.errorMessage = payload as string
        })
})

export default productsReducer