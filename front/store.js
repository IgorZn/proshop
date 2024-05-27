import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./src/slices/apiSlice.js";
import cartSlice from "./src/slices/cartSlice.js";
import authSlice from "./src/slices/authSlice.js";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [cartSlice.reducerPath]: cartSlice.reducer,
        [authSlice.reducerPath]: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store