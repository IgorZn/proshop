import { httpClient } from "./httpClient.js";

export async function getProducts() {
    const { data } = await httpClient.get("/products")
    return data.products
}

export async function getProduct(id) {
    const { data } = await httpClient.get(`/products/${id}`)
    return data.product
}