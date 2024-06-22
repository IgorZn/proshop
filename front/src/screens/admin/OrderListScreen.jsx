import {useLogoutMutation} from "../../slices/usersApiSlice.js";
import AdminRoute from "../../components/AdminRoute.jsx";
import {useGetOrdersQuery} from "../../slices/orderApiSlice.js";
import {useCheckToken} from "../../hooks/useCheckToken.js";
import {toast} from "react-toastify";
import {logout} from "../../slices/authSlice.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import {Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FaTimes} from "react-icons/fa";


function OrderListScreen(props) {
    const [logoutCall] = useLogoutMutation();
    const {data, isLoading, error} = useGetOrdersQuery();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const {data: tokenStatus, isLoading: tokenLoading} = useCheckToken(userInfo)
    const navigater = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await logoutCall()
        dispatch(logout());
        navigater('/login');
    }

    useEffect(() => {
        if(tokenStatus?.status !== undefined){
            console.log('useEffect', tokenStatus?.status)
            !tokenStatus?.status && logoutHandler()
        }
    }, [tokenLoading]);

    return (
        <>
            {isLoading ? <Loader/> :
                error ? <Message variant='danger'>{error.data}</Message>
                    : (
                        <AdminRoute>
                            <Table striped hover responsive className="table-sm">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {data?.orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <FaTimes style={{color: 'red'}}></FaTimes>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <FaTimes style={{color: 'red'}}></FaTimes>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </AdminRoute>
                    )}

        </>
    )
}

export default OrderListScreen;