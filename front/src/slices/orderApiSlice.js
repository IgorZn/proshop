import {apiSlice} from "./apiSlice.js";
import Cookies from 'js-cookie'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `orders`,
                method: "POST",
                body: {...data},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.token}`
                }
            })
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `orders/${orderId}`,
            }),
            transformResponse: async (response, meta) => {
                return {...response, bigData: 'meta.bigData'}
            },
            keepUnusedDataFor: 5
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `orders/mine`,
        }),
            keepUnusedDataFor: 5
        }),
        addOrderItem: builder.mutation({
            query: (data) => ({
                url: `orders`,
                method: "POST",
                body: data
            })
        }),
        updateOrderToPaid: builder.mutation({
            query: (orderId) => ({
                url: `orders/${orderId}/pay`,
                method: "PUT"
            })
        }),
        updateOrderToDelivered: builder.mutation({
            query: (orderId) => ({
                url: `orders/${orderId}/deliver`,
                method: "PUT"
            })
        }),
        getOrders: builder.query({
            query: () => ({
                url: `orders`,
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useAddOrderItemMutation,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation
} = orderApiSlice