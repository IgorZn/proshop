import {apiSlice} from "./apiSlice.js";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `orders`,
                method: "POST",
                body: {...data}
            })
        }),
        getOrders: builder.query({
            query: () => `orders`,
            keepUnusedDataFor: 5
        }),
        getOrderById: builder.query({
            query: (orderId) => `orders/${orderId}`,
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
                url: `orders/deliver/${orderId}`,
                method: "PUT"
            })
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useAddOrderItemMutation,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation
} = orderApiSlice