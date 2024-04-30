import express from "express";
import {getProduct, getProducts} from "./product.controller.js";

export const productRouter = express.Router();

productRouter.get("/", getProducts)
productRouter.get("/:id", getProduct)