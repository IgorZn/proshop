import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import Message from "../components/Message.jsx";
import {useCreateOrderMutation} from "../slices/orderApiSlice.js";
import {clearCart} from "../slices/cartSlice.js";
import {PrivateRoute} from "../components/PrivateRoute.jsx";
import Loader from "../components/Loader.jsx";
import {toast} from "react-toastify";
import {useCheckTokenMutation, useLogoutMutation} from "../slices/usersApiSlice.js";
import {logout} from "../slices/authSlice.js";
import {useCheckToken} from "../hooks/useCheckToken.js";

function PlaceOrderScreen() {
    const navigater = useNavigate();
    const cart = useSelector(state => state.cart);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();
    const [checkToken, {data, error: errorToken}] = useCheckTokenMutation();
    const [logoutCall] = useLogoutMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigater('/shipping')
        } else if (!cart.paymentInfo) {
            navigater('/payment')
        }
    }, [cart.paymentInfo, cart.shippingAddress.address, navigater])

    const {data: tokenStatus} = useCheckToken(userInfo)

    const placeOrderHandler = async () => {
        if(tokenStatus.status) {
            try {
                const data = await createOrder({
                    orderItems: cart.cartItem,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentInfo.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                    token: userInfo.token
                }).unwrap()

                localStorage.removeItem('cartItem')
                navigater(`/order/${data.order._id}`)
                dispatch(clearCart())
            } catch (error) {
                toast.error(error)
            }

        } else {
            toast.error(tokenStatus.message + ' Please login again')
            dispatch(logout())
            logoutCall()
            navigater('/login')
        }
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <PrivateRoute>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address: </strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                    {cart.shippingAddress.postalCode},{' '}
                                    {cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {cart.paymentInfo.paymentMethod}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItem.length === 0 ? <Message>Your cart is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItem.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {error && <Message variant='danger'>{error}</Message>}

                                <ListGroup.Item>

                                    <Button
                                        type='button'
                                        className='btn-block'
                                        disabled={cart.cartItem === 0}
                                        onClick={placeOrderHandler}>
                                        Place Order
                                    </Button>
                                </ListGroup.Item>

                                {isLoading && <Loader />}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </PrivateRoute>
        </>
    );
}

export default PlaceOrderScreen;