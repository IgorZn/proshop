import {Product} from "../../schemas/mongo/product.mongo.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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

export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
        .exec()
        .then(product => res.status(200).json({status: true, product}))
        .catch(err => res.status(404).json({status: false, message: err.message}))
}

export const createProductReview = async (req, res) => {
    try{
        console.log(mongoose.isValidObjectId(req.body.user))
        const userId = mongoose.isValidObjectId(req.body.user) ? new ObjectId(req.body.user) : req.session.user._id
        const userName = req.body.name || req.session.user.name
        const rating = +req.body.rating || 0

        const product = await Product.findById(req.params.id)

        if(!product) return res.status(404).json({status: false, message: "Product not found"})

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.body.user.toString())

        if(alreadyReviewed){
            return res.status(400).json({status: false, message: "Product already reviewed"})
        }

        const review = {
            name: userName,
            rating: rating,
            comment: req.body.comment,
            user: userId
        };

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({status: true, message: "Review added"})
    } catch (e) {
        console.log(e)
        res.status(500).json({status: false, message: e.message})
    }

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