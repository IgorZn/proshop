import express from "express";
import {getProduct, getProducts} from "./product.controller.js";
import errorHandler from "../../middleware/ErrorHandler.js";

export const productRouter = express.Router();

productRouter.get("/", getProducts).use(errorHandler)
productRouter.get("/:id", getProduct)