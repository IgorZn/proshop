import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../slices/usersApiSlice.js";
import {logout} from "../slices/authSlice.js";
import {useCookies} from "react-cookie";

import React from 'react';

function Header(props) {
    const {cartItem} = useSelector(state => state.cart);
    const {userInfo} = useSelector(state => state.auth);

    // Cookies
    const [removeCookie] = useCookies(['jwt']);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutUser] = useLogoutMutation();


    const logoutHandler = async () => {
        await logoutUser().unwrap()

        removeCookie('jwt')
        removeCookie('connect.sid')

        dispatch(logout())
        navigate("/login")
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to={"/"}>
                        <Navbar.Brand>
                            <img
                                src={logo}
                                className={"d-inline-block align-middle"}
                            />
                            ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to={"/cart"}>
                                <Nav.Link>
                                    <FaShoppingCart/> Cart
                                    {cartItem.length > 0 && (
                                        <span className={"badge rounded-pill bg-success m-1"}>{
                                            cartItem.reduce((a, c) => a + c.qty, 0)}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id={'username'}>
                                    <LinkContainer to={'/profile'}>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to={"/login"}>
                                    <Nav.Link><FaUser/> Sing In</Nav.Link>
                                </LinkContainer>)
                            }
                            {userInfo?.isAdmin && (
                                <NavDropdown title={'Admin'} id={'adminmenu'}>
                                    <LinkContainer to={'/admin/users'}>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={'/admin/productlist'}>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={'/admin/orderlist'}>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;