import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Row, Button, Col } from 'react-bootstrap';
import FormContainer from "../components/FormContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import { useAuthMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

function LoginScreen(props) {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [auth, { isLoading }] = useAuthMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const { search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [redirect, navigate, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await auth({login, password}).unwrap()
        console.log(res)
        dispatch(setCredentials({ ...res }));
        navigate(redirect || '/');
    }

    return (
        isLoading ? <Loader /> : (
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username' className='my-2'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter username'
                            value={login}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Sign In
                    </Button>

                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                        </Col>
                    </Row>

                </Form>
            </FormContainer>
        )
    )
}

export default LoginScreen;