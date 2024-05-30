
export const addOrderItem = async (req, res) => {
    return res.status(200).json({status: true, message: "addOrderItem"})
}

export const getMyOrderItems = async (req, res) => {
    return res.status(200).json({status: true, message: "getMyOrderItems"})
}

export const getOrderById = async (req, res) => {
    return res.status(200).json({status: true, message: "getOrderById"})
}

export const updateOrderToPaid = async (req, res) => {
    return res.status(200).json({status: true, message: "updateOrderToPaid"})
}

export const updateOrderToDelivered = async (req, res) => {
    return res.status(200).json({status: true, message: "updateOrderToDelivered"})
}

export const getOrders = async (req, res) => {
    return res.status(200).json({status: true, message: "getOrders"})
}