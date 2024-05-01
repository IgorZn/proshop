import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from "../components/Product.jsx";
import {useState, useEffect} from "react";
import {getProducts} from "../../hooks/requests.js";

function HomeScreen(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts()
            setProducts(products)
        }

        fetchProducts()
    }, []);

    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {products.map((product) => (
                    <Col xs={12} sm={12} md={6} lg={4} key={product.id}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default HomeScreen;