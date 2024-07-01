import {useNavigate, useParams} from "react-router-dom";
import {
    useDeleteProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation
} from "../../slices/productApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import {Button, Form} from "react-bootstrap";
import FormContainer from "../../components/FormContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useLogoutMutation} from "../../slices/usersApiSlice.js";
import {logout} from "../../slices/authSlice.js";

function EditProductScreen(props) {
    const {id} = useParams()
    const {data, error, isLoading} = useGetProductQuery(id)
    const [updateProduct, {error: updateError}] = useUpdateProductMutation()
    const [uploadProductImage, {error: uploadImageError, isLoading: uploadImageIsLoading}] = useUploadProductImageMutation()
    const {userInfo} = useSelector(state => state.auth);
    const navigater = useNavigate();
    const [logoutCall] = useLogoutMutation();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault()
        const updatedProductData = {
            id,
            user: userInfo._id,
            name,
            price: +price,
            image,
            brand,
            category,
            countInStock: +countInStock,
            description,
        }

        console.log(updatedProductData)
        const result = await updateProduct(updatedProductData)
        if (result.error) {
            toast.error(result?.error?.data.message)
        } else {
            toast.success('Product updated successfully')
            navigater('/admin/productlist')
        }}

    const uploadImageHandler = async (e) => {
        const formData = new FormData()
        formData.append('uploadFile', e.target.files[0])

        console.log(formData.getAll('uploadFile'))
        console.log(e.target.files[0])
        await uploadProductImage(formData)
            .unwrap()
            .then((res) => {
                toast.success('Image uploaded successfully')
                console.log(res)
                setImage(res.data.path)
            })
            .catch((err) => {
                console.log(err?.data.message)
                toast.error(err?.data.message)
            })
    }

    useEffect(() => {
        if(!updateError?.data.status && updateError?.status === 403) {
            toast.error(updateError?.data.message)
            toast.info('Please re-login to continue')
            logoutCall()
            dispatch(logout());
            navigater('/login')
        }

    }, [updateError]);

    useEffect(() => {
        if (data) {
            setName(data.product.name)
            setPrice(data.product.price)
            setImage(data.product.image)
            setBrand(data.product.brand)
            setCategory(data.product.category)
            setCountInStock(data.product.countInStock)
            setDescription(data.product.description)
        }
    }, [data]);

    return <>
        <LinkContainer to="/admin/productlist">
            <Button className="btn btn-success my-3">Go Back</Button>
        </LinkContainer>
        <h1>Edit Product</h1>
        {error ?
            (<Message variant="danger">{error}</Message>) :
            isLoading ?
                <Loader/> :
                data.product ? (
                    <FormContainer>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    value={image}
                                    onChange={(e) => setImage('/upload/' + e.target.value)}
                                />
                                <Form.Control
                                    label="Choose File"
                                    type="file"
                                    name="uploadFile"
                                    onChange={uploadImageHandler}
                                />
                                {uploadImageIsLoading && <Loader/>}
                                {uploadImageError && <Message variant="danger">{uploadImageError}</Message>}
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="countInStock">
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter countInStock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary" className={"my-3"}>
                                Update
                            </Button>
                        </Form>
                    </FormContainer>
                ) : null}
    </>
}

export default EditProductScreen;