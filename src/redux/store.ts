import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import CartReducer from "./features/cartSlice";
import ProductReducer from "./features/productSlice";
import ProductsReducer from "./features/productsSlice";
import DrawerReducer from "./features/drawerSlice";

export const store = configureStore({
    reducer: {
        CartReducer,
        ProductReducer,
        ProductsReducer,
        DrawerReducer
    },
    devTools: process.env.NODE_ENV !== "production",
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;