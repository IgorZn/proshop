import http from "node:http"
import app from "./app.js";


const server = http.createServer(app)

server.listen(5001, '127.0.0.1', async () => {
    console.log(`Server started on port ${server.address().port}`)
    console.log(server.address())
})