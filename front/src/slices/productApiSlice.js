import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products`,
            keepUnusedDataFor: 5
        }),
        getProduct: builder.query({
            query: (productId) => `products/${productId}`,
            keepUnusedDataFor: 5
        })
    }),
})

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice