import { createSlice } from "@reduxjs/toolkit";

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
    name: "cart",
    initialState: localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart")) : {cartItem: []},
    reducers: {
        addToCart: (state, action) => {
            const cartItem = action.payload
            const isExist = state.cartItem.find(item => item._id === cartItem._id)
            if(isExist) {
                state.cartItem = state.cartItem.map(item => item._id === cartItem._id ? cartItem : item)
            } else {
                state.cartItem = [...state.cartItem, cartItem]
            }

            // Calculate items price
            state.itemsPrice = addDecimals(
                state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0))

            // Calculate shiping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            // Calculate tax price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            // Calculate total price
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
            )

            localStorage.setItem("cart", JSON.stringify(state))
        }
    },
})

export const { addToCart } = cartSlice.actions

export default cartSlice