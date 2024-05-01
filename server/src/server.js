import http from "node:http"
import app from "./app.js";
import dotenv from "dotenv"
import {connectToMongoDB} from "./db.js";

dotenv.config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL


const server = http.createServer(app)

server.listen(PORT, '127.0.0.1', async () => {
    console.log(`Server started on port ${PORT}`)
    console.log(server.address())

    await connectToMongoDB(MONGO_URL)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection ERR>>>',err))
})