import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePaymentInfo} from "../slices/cartSlice.js";
import {Form, Button, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import {PrivateRoute} from "../components/PrivateRoute.jsx";



function PaymentScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const {shippingAddress, paymentInfo} = cart;
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentInfo) {
            navigate('/payment');
        }
    }, [shippingAddress, paymentInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentInfo({paymentMethod}));
        navigate('/placeorder');
    }

    return (
        <PrivateRoute>
            <FormContainer>
                <CheckoutSteps step1 step2 step3/>
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                            />
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </PrivateRoute>
    );
}

export default PaymentScreen;