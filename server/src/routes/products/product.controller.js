import products from "../../products.js";

export const getProducts = async (req, res) => {
    return res.status(200).json({status: "success", products});
}

export const getProduct = async (req, res) => {
    const product = products.find(p => p.id === +req.params.id);
    return res.status(200).json({status: "success", product});
}

export const testGet = (req, res) => {
    return res.status(200).json({status: true, message: "test"});
}