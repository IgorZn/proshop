import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "./Rating.jsx";
import {LinkContainer} from "react-router-bootstrap";

function Product({product}) {
    return (
        <>
            <Card className={"my-3 p-3 rounded"}>
                <LinkContainer to={"/product/" + product.id}>
                    <Link>
                        <Card.Img src={product.image} variant="top"/>
                    </Link>
                </LinkContainer>

                <CardBody style={{width: "18em"}}>
                    <LinkContainer to={"/product/" + product.id}>
                        <Link>
                            <CardTitle as={"div"} style={{width: "12em"}} className={"product-title"}>
                                <strong>{product.name}</strong>
                            </CardTitle>
                        </Link>
                    </LinkContainer>
                </CardBody>
                <CardText as={"div"}>
                    <Rating value={product.rating} text={`${product.numReviews}`}/>
                </CardText>

                <CardText as={"h3"}>
                    <strong>{product.price}</strong>
                </CardText>

            </Card>
        </>
    );
}

export default Product;