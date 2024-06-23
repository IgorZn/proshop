import {Link, useParams} from "react-router-dom";
import {Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap";
import {useGetOrderByIdQuery, useUpdateOrderToPaidMutation, useUpdateOrderToDeliveredMutation} from "../slices/orderApiSlice.js";
import {PrivateRoute} from "../components/PrivateRoute.jsx";
import {useDispatch} from "react-redux";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {toast} from "react-toastify";

function OrderScreen(props) {
    const {id} = useParams();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const {data, isLoading, error, location, refetch} = useGetOrderByIdQuery(id);
    const [updateOrderToPaid, {isLoading: loadingPaid}] = useUpdateOrderToPaidMutation();
    const [updateOrderToDelivered, {isLoading: loadingDelivered}] = useUpdateOrderToDeliveredMutation();
    const dispatch = useDispatch()

    const updateOrderToPaidHelper = async () => {
        await updateOrderToPaid(data.order._id)
        refetch()
        toast.success('Order paid successfully')

    }

    const updateOrderToDeliveredHelper = async () => {
        await updateOrderToDelivered(data.order._id)
        refetch()
        toast.success('Order delivered successfully')
    }

    return isLoading ? <Loader/>
        : error
            ? <Message variant={'danger'}>{error}</Message>
            : (
                <PrivateRoute>
                    <h1>Order {data.order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant={'flush'}>
                                {/*Shipping*/}
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong>{data.order.user.name}</p>
                                    <p><strong>Email: </strong><a
                                        href={`mailto:${data.order.user.email}`}>{data.order.user.email}</a></p>
                                    <p>
                                        <strong>Address:</strong>
                                        {data.order.shippingAddress.address}, {data.order.shippingAddress.city}{' '}
                                        {data.order.shippingAddress.postalCode},{' '}
                                        {data.order.shippingAddress.country}
                                    </p>
                                    {data.order.isDelivered ? (
                                        <Message variant="success">
                                            Delivered on {data.order.deliveredAt.substring(0, 10)}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">Not Delivered</Message>
                                    )}
                                </ListGroup.Item>

                                {/*Payment*/}
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {data.order.paymentMethod}
                                    </p>
                                    {data.order.isPaid ? (
                                        <Message variant="success">Paid on {data.order.paidAt.substring(0, 10)}</Message>
                                    ) : (
                                        <Message variant="danger">Not Paid</Message>
                                    )}
                                </ListGroup.Item>

                                {/*Order Items*/}
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {data.order.orderItems.length === 0 ? (
                                        <Message>Order is empty</Message>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {data.order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
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
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${data.order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${data.order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${data.order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${data.order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                {data.order.isPaid ? (
                                                    <Message variant="success">Paid on {data.order.paidAt.substring(0, 10)}</Message>
                                                ) : (
                                                    <Message variant="danger">Not Paid</Message>
                                                )}
                                            </Col>
                                            <Col>
                                                {(data.order.isPaid && userInfo.isAdmin) ? (
                                                    <Button disabled={true} variant={"secondary"}>Pay Order</Button>
                                                ) : (
                                                    <Button onClick={updateOrderToPaidHelper}>Pay Order</Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                {(data.order.isDelivered) ? (
                                                    <Message variant="success">Delivered on {data.order.deliveredAt.substring(0,10)}</Message>
                                                ) : (
                                                    <Message variant="danger">Not Delivered</Message>
                                                )}
                                            </Col>
                                            <Col>
                                                {(data.order.isDelivered && userInfo.isAdmin) ? (
                                                    <Button disabled={true} variant={"secondary"}>Delivered Order</Button>
                                                ) : (
                                                    <Button onClick={updateOrderToDeliveredHelper}>Delivered Order</Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </PrivateRoute>
            );
}

export default OrderScreen;