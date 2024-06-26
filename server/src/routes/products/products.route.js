import express from "express";
import {createProduct, editProduct, getProduct, getProducts} from "./product.controller.js";
import errorHandler from "../../middleware/ErrorHandler.js";
import {adminRoute, protectedRoute} from "../../middleware/authMiddleware.js";

export const productRouter = express.Router();

productRouter.get("/", getProducts).use(errorHandler)
productRouter.get("/:id", getProduct)
productRouter.put("/:id/edit", protectedRoute, adminRoute, editProduct)
productRouter.post('/', protectedRoute, adminRoute, createProduct).use(errorHandler)