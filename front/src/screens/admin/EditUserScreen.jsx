import {LinkContainer} from "react-router-bootstrap";
import {Button, Form} from "react-bootstrap";
import {useGetUserByIdQuery, useUpdateUserByIdMutation} from "../../slices/usersApiSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import FormContainer from "../../components/FormContainer.jsx";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

function EditUserScreen(props) {
    const {id} = useParams()
    const {data, isLoading, error} = useGetUserByIdQuery(id);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState();
    const [updateUser, {error: updateError}] = useUpdateUserByIdMutation();
    const navigater = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateUser({id, name, email, isAdmin: admin});

        if (updateError) {
            toast.error(updateError.data.message);
        } else {
            toast.success('User updated successfully');
            navigater('/admin/users')
        }
    }

    useEffect(() => {
        if (data) {
            setName(data.user.name);
            setEmail(data.user.email);
            setAdmin(data.user.isAdmin);
        }
    }, [data, setName, setEmail]);


    return (
        <>
            <LinkContainer to="/admin/users">
                <Button className="btn btn-success my-3">Go Back</Button>
            </LinkContainer>

            {isLoading && <Loader/>}
            {error && <Message variant="danger">{error.data.message}</Message>}
            {data && (
                <FormContainer>
                    <h1>Edit User</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email" className={"my-2"}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Form.Group controlId="admin" className={"my-2"}>
                            <Form.Check
                                type="checkbox"
                                checked={admin}
                                label="Is Admin"
                                onChange={(e) => setAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary" className={"my-3"}>
                            Update
                        </Button>
                    </Form>
                </FormContainer>
            )}
        </>
    );
}

export default EditUserScreen;