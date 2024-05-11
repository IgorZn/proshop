import {Product} from "./schemas/mongo/product.mongo.js";
import {User} from "./schemas/mongo/user.mongo.js";
import {users} from "./data/users.js";
import {connectToMongoDB} from "./db.js";
import products from "./data/products.js";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.MONGO_URL

await connectToMongoDB(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection ERR>>>',err))

const usersDb = await User.find({})

if(usersDb) {
    products.forEach(product => {
        delete product.id
        product.user = usersDb[0]._id
    })
    const productsDb = await Product.find({})

    if (!productsDb.length) {
        await Product.insertMany(products)
            .then(() => {
                console.log('Products inserted')
            })
    } else {
        productsDb.forEach(async (product) => {
            const productId = products.filter(prod => prod.price === product.price)[0]
            delete productId.id
            // console.log(product.countInStock, productId.countInStock, productId.name )
            // console.log(productId, product)
            await Product.findByIdAndUpdate(product._id, productId, {new: true})
                .exec()
                .then(updProduct => {
                    console.log(updProduct)
                })
        })
        console.log('Product was updated')

    }

} else {
    await User.insertMany(users)
}


if (usersDb) process.exit(0)