import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from "../components/Product.jsx";
import { useGetProductsQuery} from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {Link, useParams} from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarusel from "./ProductCarusel.jsx";

function HomeScreen(props) {
    const {pageNumber, keyword} = useParams()
    const {data, error, isLoading} = useGetProductsQuery({pageNumber, keyword});

    return (
        <>
            {!keyword ? <ProductCarusel/> : (
                <Link to="/" className="btn btn-light mb-4">
                    Go Back
                </Link>
            )}
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
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        isAdmin={false}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            ) : null}

        </>
    );
}

export default HomeScreen;