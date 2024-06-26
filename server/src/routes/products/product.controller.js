import {Product} from "../../schemas/mongo/product.mongo.js";
import mongoose from "mongoose";

/**
 * Get all products
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const getProducts = async (req, res) => {
    // console.log('getProducts>>>', req.session)
    await Product.find({})
        .then(products => res.status(200).json({status: true, products}))
        .catch(err => res.status(500).json({status: false, message: err.message}))}

/**
 * Get single product by id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const getProduct = async (req, res) => {
    // console.log('getProduct>>>', req.headers)
    // console.log('getProduct>>>', req.session.id)
    let product
    if(mongoose.isValidObjectId(req.params.id)){
        product = await Product.findById(req.params.id)
    }
    if(!product) return res.status(404).json({message: "Product not found"});
    return res.status(200).json({status: true, product});
}

export const createProduct = async (req, res) => {
    req.body.user = req.body.user || req.session.user._id
    await Product.create(req.body)
        .then(product => res.status(201).json({status: true, product}))
        .catch(err => {
            console.log(err)
            res.status(500).json({status: false, message: err.message})
        })
}

export const editProduct = async (req, res) => {
    console.log(req.body)
    // req.body.user = req.body.user || req.session.user._id
    await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .exec()
        .then(product => res.status(200).json({status: true, product}))
        .catch(err => res.status(404).json({status: false, message: err.message}))
}




/**
 * For testing
 * @param req
 * @param res
 * @returns {*}
 */
export const testGet = (req, res) => {
    return res.status(200).json({status: true, message: "test"});
}