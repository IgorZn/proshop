import { Container, Row, Col } from "react-bootstrap";
import React from 'react';

function Footer(props) {
    const currYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className={'text-center py-3'} >
                        <p>ProShop &copy; {currYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;