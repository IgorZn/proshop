import {Navbar, Nav, Container} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png";
import {LinkContainer} from "react-router-bootstrap";
import { useSelector} from "react-redux";

import React from 'react';

function Header(props) {
    const { cartItem } = useSelector(state => state.cart);

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
                                    <FaShoppingCart /> Cart
                                    {cartItem.length > 0 && (
                                        <span className={"badge rounded-pill bg-success m-1"}>{
                                            cartItem.reduce((a, c) => a + c.qty, 0)}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to={"/login"}>
                                <Nav.Link><FaUser/> Sing In</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;