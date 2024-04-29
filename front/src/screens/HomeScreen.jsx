import React from 'react';
import {Row, Col} from 'react-bootstrap';
import products from "../products.js";
import Product from "../components/Product.jsx";

function HomeScreen(props) {
    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {products.map((product) => (
                    <Col xs={12} sm={12} md={6} lg={4} key={product.id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default HomeScreen;