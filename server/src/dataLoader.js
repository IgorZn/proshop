import {Product} from "./schemas/mongo/product.mongo.js";
import {User} from "./schemas/mongo/user.mongo.js";
import {users} from "./data/users.js";
import {connectToMongoDB} from "./db.js";
import products from "./data/products.js";

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
    await Product.insertMany(products)
} else {
    await User.insertMany(users)
}


if (usersDb) process.exit(0)