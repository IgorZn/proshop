import http from "node:http"
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT


const server = http.createServer(app)

server.listen(PORT, '127.0.0.1', async () => {
    console.log(`Server started on port ${PORT}`)
    console.log(server.address())
})