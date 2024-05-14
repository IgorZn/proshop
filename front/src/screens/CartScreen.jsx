import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Button, Image, ListGroup, Form, Card} from "react-bootstrap";
import React from 'react';
import {FaTrash} from "react-icons/fa";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../slices/cartSlice.js";

function CartScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const {cartItem} = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    const removeCartHandler = async (product) => {
        dispatch(removeFromCart({...product}))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                {cartItem.length === 0 ?
                    <Message variant={'info'}>Your cart is empty
                        <Link to="/">Go Back</Link>
                    </Message> :
                    (
                        <ListGroup variant={'flush'}>
                            {cartItem.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => {
                                                    addToCartHandler(item, Number(e.target.value))
                                                }}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}

                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() => {
                                                    removeCartHandler(item)
                                                }}
                                            >
                                                <FaTrash/>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItem.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItem.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;