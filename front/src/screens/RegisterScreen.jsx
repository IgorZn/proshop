import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../slices/usersApiSlice.js";
import {setCredentials} from "../slices/authSlice.js";
import {Form, Row, Button, Col, Card, Container} from 'react-bootstrap';
import {toast} from "react-toastify";


function RegisterScreen(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match');
            return;
        } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        } else {
            try {
                const res = await register({name, login, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/');
            } catch (err) {
                toast.error(err.data.message);
            }
        }
    }

    return (
        <Container className={"h-100"}>
            <Row className="h-100 justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        required
                                        onChange={(e) => setLogin(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="mb-3">
                                    <Button type="submit">Sign Up</Button>
                                </div>
                                <div className="mb-3">
                                    Already have an account?{' '}
                                    <a href={`/login?redirect=${redirect}`}>Login</a>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterScreen;