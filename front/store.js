import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./src/slices/apiSlice.js";
import cartSlice from "./src/slices/cartSlice.js";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store