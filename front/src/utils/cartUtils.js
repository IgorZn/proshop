export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    // Calculate items price
    state.itemsPrice = addDecimals(
        state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0))

    // Calculate shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

    // Calculate tax price
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

    // Calculate total price
    state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
    )

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state))

    return state
}