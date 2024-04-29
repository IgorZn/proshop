import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";

function Product({product}) {
    return (
        <>
            <Card className={"my-3 p-3 rounded"} style={{ width: 'auto' }}>
                <a href={`/products/${product._id}`}>
                    <Card.Img src={product.image} variant="top"/>
                </a>

                <CardBody>
                    <a href={`/product/${product._id}`}>
                        <CardTitle as={"div"}>
                            <strong>{product.name}</strong>
                        </CardTitle>
                    </a>
                </CardBody>

                <CardText as={"h3"}>
                    <strong>{product.price}</strong>
                </CardText>

            </Card>
        </>
    );
}

export default Product;