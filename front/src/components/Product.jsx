import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "./Rating.jsx";

function Product({product}) {
    return (
        <>
            <Card className={"my-3 p-3 rounded"}>
                <Link to={`/products/${product.id}`}>
                    <Card.Img src={product.image} variant="top"/>
                </Link>

                <CardBody style={{width: "18em"}}>
                    <Link to={`/product/${product.id}`}>
                        <CardTitle as={"div"} style={{width: "12em"}} className={"product-title"}>
                            <strong>{product.name}</strong>
                        </CardTitle>
                    </Link>
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