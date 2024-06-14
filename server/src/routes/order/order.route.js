import express from "express";
import {adminRoute, protectedRoute} from "../../middleware/authMiddleware.js";
import {
    addOrderItem,
    getMyOrderItems,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
} from "./order.controller.js";

export const orderRouter = express.Router();

orderRouter.get("/", protectedRoute, adminRoute, getOrders)
orderRouter.post('/', protectedRoute, addOrderItem)
orderRouter.get("/mine", protectedRoute, getMyOrderItems)
orderRouter.get("/:id", getOrderById)
orderRouter.put("/:id/pay", protectedRoute, updateOrderToPaid)
orderRouter.put("/:id/deliver", protectedRoute, adminRoute, updateOrderToDelivered)
