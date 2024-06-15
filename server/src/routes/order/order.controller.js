import {Order} from "../../schemas/mongo/order.mongo.js";

export const addOrderItem = async (req, res) => {
    const {
        orderItems,
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
            orderItems: orderItems.map(item => ({
                ...item,
                product: item._id,
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
 * @example /api/v1/orders
 * @description Retrieves the orders belonging to the authenticated user.
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
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save()
        return res.status(200).json({status: true, order: updatedOrder})
    } else {
        return res.status(200).json({status: true, message: "Order not found"})}
}

export const updateOrderToDelivered = async (req, res) => {
    return res.status(200).json({status: true, message: "updateOrderToDelivered"})
}

export const getOrders = async (req, res) => {
    return res.status(200).json({status: true, message: "getOrders"})
}