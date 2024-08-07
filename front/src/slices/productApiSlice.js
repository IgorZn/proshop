import {apiSlice} from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({pageNumber, keyword}) => ({
                url: '/products',
                method: 'GET',
                params: {pageNumber, keyword}
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
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),

        addProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products']
        }),

        updateProduct: builder.mutation({
            query(data) {
                const {id, ...body} = data
                return {
                    url: `/products/${id}/edit`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Products']
        }),

        uploadProductImage: builder.mutation({
            query: (body) => {
                return {
                    url: '/upload',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['Products']
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/products/${productId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),

        createReview: builder.mutation({
            query: (data) => {
                const {id, ...body} = data
                return {
                    url: `/products/${id}/reviews`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Product']
        }),

        getTopProducts: builder.query({
            query: () => ({
                url: '/products/top',
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products']
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} = productsApiSlice