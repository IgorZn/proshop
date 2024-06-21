import {useCheckTokenMutation, useLogoutMutation, useProfileMutation} from "../slices/usersApiSlice.js";
import {PrivateRoute} from "../components/PrivateRoute.jsx";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Table, Form, Button, Row, Col} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import {logout, setCredentials} from "../slices/authSlice.js";
import {toast} from "react-toastify";
import {useGetMyOrdersQuery} from "../slices/orderApiSlice.js";
import {useCheckToken} from "../hooks/useCheckToken.js";


function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [logoutCall] = useLogoutMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);
    const [profile, {isLoading, error}] = useProfileMutation();

    const {data, isLoading: loadingToken, error: errorToken} = useCheckToken(userInfo);

    // Get My Orders
    const {data: myOrdersData, isLoading: loadingMyOrders, error: errorMyOrders} = useGetMyOrdersQuery();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [navigate, userInfo.name, userInfo.email]);

    useEffect(() => {
        if (data?.status === false) {
            toast.error(data?.message) + ' Please login again.';
            dispatch(logout());
            logoutCall()
            navigate('/login');
        }
    }, [loadingToken]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const res = await profile({_id: userInfo._id, name, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated successfully');
            } catch (err) {
                setMessage(err.data.message);
            }
        }
    };

    return (
        <PrivateRoute>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {isLoading && <Loader/>}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className={'my-2'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className={'my-2'}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className={'my-2'}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className={'my-2'}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' onSubmit={submitHandler}>
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingMyOrders ?
                        <Loader/> : errorMyOrders ?
                            (<Message variant='danger'>{errorMyOrders?.data.message || errorMyOrders.error}</Message>) :
                            (
                                <Table striped hover responsive className='table-sm'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {myOrdersData.orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <FaTimes style={{color: 'red'}}></FaTimes>
                                            )}</td>
                                            <td>{order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <FaTimes style={{color: 'red'}}></FaTimes>
                                            )}</td>
                                            <td>
                                                <Button className='btn-sm' variant='light'>
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )}
                </Col>
            </Row>
        </PrivateRoute>
    );
}

export default ProfileScreen;