import {Order} from "../../schemas/mongo/order.mongo.js";

export const addOrderItem = async (req, res) => {
    const {
        cartItem,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({status: false, message: "No order items"})
    } else {
        const order = await Order.create({
            orderItems: cartItem.map(item => ({
                ...item,
                product: item.product._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        res.status(200).json({status: true, order})
    }


}

/**
 * Retrieves the orders belonging to the authenticated user.
 * @route GET <api_path>/orders/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} The response object containing the orders.
 */
export const getMyOrderItems = async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    return res.status(200).json({status: true, orders})
}

export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')

    order ?
        res.status(200).json({status: true, order}) :
        res.status(200).json({status: true, message: "Order not found"})
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