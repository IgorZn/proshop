import {useParams, useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import {Row, Col, Image, Card, Button, ListGroup, Form} from "react-bootstrap"
import Rating from "../components/Rating.jsx";
import {useGetProductQuery} from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {useState} from "react";
import {addToCart} from "../slices/cartSlice.js";
import {useDispatch} from "react-redux";


function ProductScreen(props) {
    const {productId} = useParams()
    const {data, error, isLoading} = useGetProductQuery(productId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        dispatch(addToCart({...data.product, qty}))
        navigate('/cart')
    }

    return (
        <>
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : isLoading ? (
                <Loader />
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

                                    {data.product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(+e.target.value)}
                                                        >
                                                        {[...Array(data.product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}

                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={data.product.countInStock === 0}
                                            onClick={addToCartHandler}
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