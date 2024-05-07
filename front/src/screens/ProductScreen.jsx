import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import {Row, Col, Image, Card, Button, ListGroup} from "react-bootstrap"
import React from 'react';
import Rating from "../components/Rating.jsx";
import {useGetProductQuery} from "../slices/productApiSlice.js";


function ProductScreen(props) {
    const {productId} = useParams()
    const {data, error, isLoading} = useGetProductQuery(productId)


    return (
        <>
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data.product ? (
                <>
                    <Link to={'/'}>
                        <Button className="my-3 btn btn-secondary">Go Back</Button>
                    </Link>
                    <Row>
                        <Col md={5}>
                            <Image src={data.product.image} alt={data.product.name} fluid/>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{data.product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating text={`${data.product.numReviews} reviews`} value={data.product.rating}/>
                                </ListGroup.Item>
                                <ListGroup.Item>data.product price: ${data.product.price}</ListGroup.Item>
                                <ListGroup.Item>Description: {data.product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${data.product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{data.product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={data.product.countInStock === 0}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : null}
        </>
    );
}

export default ProductScreen;