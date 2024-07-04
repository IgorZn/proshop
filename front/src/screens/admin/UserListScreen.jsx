import {useDeleteUserByIdMutation, useGetUsersQuery, useLogoutMutation} from "../../slices/usersApiSlice.js";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {logout} from "../../slices/authSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import AdminRoute from "../../components/AdminRoute.jsx";
import {Button, Col, Row, Table} from "react-bootstrap";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import {LinkContainer} from "react-router-bootstrap";
import {FaEdit, FaTrash, FaRegLightbulb, FaCheck, FaTimes} from "react-icons/fa";

function UserListScreen(props) {
    const navigater = useNavigate();
    const [logoutCall] = useLogoutMutation();
    const dispatch = useDispatch();

    const {data, error, isLoading} = useGetUsersQuery();
    const [deleteUser, {error: deleteError, isLoading: deleteIsLoading}] = useDeleteUserByIdMutation();

    useEffect(() => {
        if (!error?.data.status && error?.status === 403) {
            toast.error(error?.data.message)
            toast.info('Please re-login to continue')
            logoutCall()
            dispatch(logout());
            navigater('/login')
        }

    }, [error]);

    const deleteUserHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(id)
                .unwrap()
                .then(() => toast.success('User deleted successfully'))
                .catch((err) => {
                    toast.error(err?.data.message)
                })
        }
    }

    return (
        <AdminRoute>
            <Row>
                <Col md={8}><h1>Users</h1></Col>
                <Col className={'text-end'} md={4}>
                    <Button className="my-3" >Create User</Button>
                </Col>
            </Row>

            {/*{addProductIsLoading && <Loader/>}*/}

            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error?.messages}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.isAdmin ? (<FaCheck style={{color: 'green'}} className={"m-1"}/>)
                                    : (<FaTimes style={{color: 'red'}} className={"m-1"}/>)}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm mx-2">
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    disabled={deleteIsLoading}
                                    onClick={() => deleteUserHandler(user._id)}
                                >
                                    {/*{deleteIsLoading && <Loader/>}*/}
                                    {/*{deleteError && <Message variant="danger">{deleteError.data}</Message>}*/}
                                    <FaTrash style={{color: 'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </AdminRoute>
    );
}

export default UserListScreen;