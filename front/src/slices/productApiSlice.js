import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET',
        }),
            transformResponse: async (response, meta) => {
                return {...response, koo: 'meta.response.headers'};
            },
            keepUnusedDataFor: 5,
            providesTags: ['Products']
        }),

        getProduct: builder.query({
            query: (productId) => `products/${productId}`,
            transformResponse: async (response, meta) => {
                return {...response, koo: 'meta.response.headers'};
            },
            keepUnusedDataFor: 5
        }),

        addProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products']
        }),
    }),
})

export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation } = productsApiSlice