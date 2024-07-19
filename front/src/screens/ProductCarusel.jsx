import {useGetTopProductsQuery} from "../slices/productApiSlice.js";
import {Link} from "react-router-dom";
import {Carousel, Image} from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

function ProductCarusel(props) {
    const {data, isLoading, error} = useGetTopProductsQuery();

    console.log('ProductCarusel>>',data)
    return isLoading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel>
            {data.products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ProductCarusel;