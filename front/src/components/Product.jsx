import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";

function Product({product}) {
    return (
        <>
            <Card className={"my-3 p-3 rounded"}>
                <Link to={`/products/${Math.round(Math.random() * 20)}`}>
                    <Card.Img src={product.image} variant="top"/>
                </Link>

                <CardBody style={{width: "18em"}}>
                    <Link to={`/product/${Math.round(Math.random() * 20)}`}>
                        <CardTitle as={"div"} style={{width: "12em"}}>
                            <strong>{product.name}</strong>
                        </CardTitle>
                    </Link>
                </CardBody>

                <CardText as={"h3"}>
                    <strong>{product.price}</strong>
                </CardText>

            </Card>
        </>
    );
}

export default Product;