import AdminRoute from "../../components/AdminRoute.jsx";
import {Button, Row, Table} from "react-bootstrap";
import {FaEdit, FaTimes, FaTrash} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useGetProductsQuery} from "../../slices/productApiSlice.js";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";

function ProductListScreen(props) {
    const {data, isLoading, error} = useGetProductsQuery();

    console.log(data)

    return (
        <AdminRoute>
            <Row className="align-items-center">
                <h1>Products</h1>
                <LinkContainer to="/admin/product/create">
                    <Button className="my-3">Create Product</Button>
                </LinkContainer>
            </Row>
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
                                    onClick={() => props.history.push(`/admin/product/${product._id}/delete`)}
                                >
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