import {useParams, useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import {Row, Col, Image, Card, Button, ListGroup, Form} from "react-bootstrap"
import Rating from "../components/Rating.jsx";
import {useCreateReviewMutation, useGetProductQuery} from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {useEffect, useState} from "react";
import {addToCart} from "../slices/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";


function ProductScreen(props) {
    const {productId} = useParams()
    const {data, error, isLoading} = useGetProductQuery(productId)
    const [addReview, {error: errorReview, isLoading: isLoadingReview}] = useCreateReviewMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)

    const {userInfo} = useSelector(state => state.auth)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const addToCartHandler = () => {
        dispatch(addToCart({...data.product, qty}))
        navigate('/cart')
    }

    const reviewHandler = async (e) => {
        e.preventDefault()

        await addReview({rating, comment, id: data.product._id, user: userInfo._id, name: userInfo.name})
            .unwrap()
            .then(res => {
                toast.success(res.message)
            })
            .catch(err => console.log(err))

        setRating(0)
        setComment('')
    }

    useEffect(() => {
        if (errorReview?.status === 403) {
            toast.error(errorReview?.data.message)
            toast.info('Please re-login to continue')
        }
    }, [errorReview, isLoadingReview]);

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

                    {/* Reviews */}
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {data.product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {data.product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h2>Write a Customer Review</h2>
                            {userInfo ? (
                                <Form onSubmit={reviewHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) => setRating(+e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        disabled={isLoadingReview}
                                        type="submit"
                                        variant="primary"
                                        className={"my-3"}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to="/login">sign in</Link> to write a review
                                </Message>
                            )}
                        </Col>
                    </Row>
                </>
            ) : null}
        </>
    );
}

export default ProductScreen;