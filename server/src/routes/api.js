import express from "express";
import {productRouter} from "./products/products.route.js";
import {userRouter} from "./user/user.route.js";
import {orderRouter} from "./order/order.route.js";

export const apiV1 = express.Router();

apiV1.use('/products', productRouter)

apiV1.use('/users', userRouter)

apiV1.use('/orders', orderRouter)

apiV1.get("/test", async (req, res) => {
    console.log(res.cookies)
    return res
        .status(200)
        .json({
            status: true,
            message: "test",
            cookies: req.cookies
        });
})
