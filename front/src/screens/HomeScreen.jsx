import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from "../components/Product.jsx";
import { useGetProductsQuery} from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {Link, useParams} from "react-router-dom";

function HomeScreen(props) {
    const {pageNumber} = useParams()
    const {data, error, isLoading} = useGetProductsQuery({pageNumber});

    return (
        <>
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : isLoading ? (
                <Loader/>
            ) : data.products ? (
                <>
                    <h1>Latest Product</h1>
                    <Row>
                        {data.products.map((product) => (
                            <Col xs={12} sm={12} md={6} lg={4} key={product._id}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                </>
            ) : null}

        </>
    );
}

export default HomeScreen;