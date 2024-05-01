import axios from "axios";

const PORT = 5001
const HOST = "http://localhost:" + PORT
const URL = HOST + "/api/v1"

export const httpClient = axios.create({
    baseURL: URL
})