import express from "express";
import {productRouter} from "./products/products.route.js";

export const apiV1 = express.Router();

apiV1.use('/products', productRouter)
apiV1.get("/test", async (req, res) => {
    return res.status(200).json({status: true, message: "test"});
})
