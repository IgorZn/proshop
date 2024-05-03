import {Product} from "../../schemas/mongo/product.mongo.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    const products = await Product.find({})
    return res.status(200).json({status: "success", products});
}

export const getProduct = async (req, res) => {
    let product
    if(mongoose.isValidObjectId(req.params.id)){
        product = await Product.findById(req.params.id)
    }
    if(!product) return res.status(404).json({message: "Product not found"});
    return res.status(200).json({status: "success", product});
}

export const testGet = (req, res) => {
    return res.status(200).json({status: true, message: "test"});
}