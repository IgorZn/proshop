import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from "../utils/cartUtils.js";



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

            return updateCart(state)

        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter(item => item._id !== action.payload._id)
            return updateCart(state)
        }
    },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice