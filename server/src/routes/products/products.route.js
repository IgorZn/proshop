import express from "express";
import {
    createProduct,
    createProductReview,
    deleteProduct,
    editProduct,
    getProduct,
    getProducts
} from "./product.controller.js";
import errorHandler from "../../middleware/ErrorHandler.js";
import {adminRoute, protectedRoute} from "../../middleware/authMiddleware.js";

export const productRouter = express.Router();

productRouter.get("/", getProducts).use(errorHandler)
productRouter.get("/:id", getProduct)
productRouter.put("/:id/edit", protectedRoute, adminRoute, editProduct)
productRouter.post('/', protectedRoute, adminRoute, createProduct).use(errorHandler)
productRouter.delete('/:id/delete', protectedRoute, adminRoute, deleteProduct).use(errorHandler)
productRouter.post('/:id/reviews', protectedRoute, createProductReview).use(errorHandler)