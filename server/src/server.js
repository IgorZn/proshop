import http from "node:http"
import app from "./app.js";
import dotenv from "dotenv"
import {connectToMongoDB} from "./db.js";

import { fileURLToPath } from 'url';
import { dirname } from 'node:path';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname.split(path.sep).join('/'))
console.log(path.resolve())
console.log(path.parse(__dirname))

dotenv.config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL


const server = http.createServer(app)

server.listen(PORT, '127.0.0.1', async (srvData) => {
    console.log(`Server started on port ${PORT}`)
    console.log(server.address())

    await connectToMongoDB(MONGO_URL)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection ERR>>>',err))
})