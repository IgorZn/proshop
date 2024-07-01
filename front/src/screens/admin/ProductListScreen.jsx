import AdminRoute from "../../components/AdminRoute.jsx";
import {Button, Col, Row, Table} from "react-bootstrap";
import {FaEdit, FaTimes, FaTrash} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useAddProductMutation, useDeleteProductMutation, useGetProductsQuery} from "../../slices/productApiSlice.js";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../../slices/usersApiSlice.js";
import {useDispatch} from "react-redux";
import {logout} from "../../slices/authSlice.js";


function ProductListScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutCall] = useLogoutMutation();
    const {data, isLoading, error} = useGetProductsQuery();
    const [addProduct, {isLoading: addProductIsLoading, error: addProductError}] = useAddProductMutation();
    const [deleteProduct, {error: deleteError, isLoading: deleteIsLoading}] = useDeleteProductMutation()

    const createProductHandler = async () => {
        await addProduct({
            name: 'sample name ' + Date.now(),
            price: 0, image: '/images/sample.jpg',
            brand: 'sample brand',
            category: 'sample category',
            countInStock: 0,
            description: 'sample description'})
    }

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id)
                .unwrap()
                .then(() => toast.success('Product deleted successfully'))
                .catch((err) => {
                    toast.error(err?.data.message)
                })
        }
    }

    useEffect(() => {
        if(addProductError || deleteError) {
            !addProductError?.status && toast.error(addProductError?.data.message)
            !deleteError?.status && toast.error(deleteError?.data.message)

            logoutCall()
            dispatch(logout());
            navigate('/login')
        }

    }, [isLoading]);

    return (
        <AdminRoute>
            <Row>
                <Col md={8}><h1>Products</h1></Col>
                <Col className={'text-end'} md={4}>
                    <Button className="my-3" onClick={createProductHandler}>Create Product</Button>
                </Col>
            </Row>

            {addProductIsLoading && <Loader/>}

            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error.data}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm mx-2">
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    disabled={deleteIsLoading}
                                    onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;