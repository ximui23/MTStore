import React, { useEffect } from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
// import { Link } from 'react-router-dom';

export default function HomeScreen() {
    //get productList from redux store through useSelector 
    const productList = useSelector(state => state.productList);

    //get values from productList
    const { loading, error, products } = productList;

    // const topProductsList = useSelector(state => state.topProductsList);
    // const { loading: topProductsListloading, error: topProductsListError, products: topProducts } = topProductsList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        // dispatch(listTopProducts());
    }, [dispatch]);

    return (
        <div>
            {/* <h2>Top Products</h2>
            {topProductsListloading ? <LoadingBox></LoadingBox>
                :
                // If error is true -> MessageBox
                topProductsListError ? <MessageBox variant="danger">{topProductsListError}</MessageBox>
                    :
                    (
                        <>
                            {topProducts.length === 0 && <MessageBox>No Top Product Found</MessageBox>}
                            <Carousel showArrows autoPlay showThumbs={false}>
                                {topProducts.map((tp) => {
                                    <div key={tp._id}>
                                        <Link to={`/api/products/${tp._id}`}>
                                            <img src={tp.images}></img>
                                        </Link>
                                    </div>
                                })}
                            </Carousel>
                        </>
                    )
            } */}
            <h2>Featured Products</h2>
            {/* If loading is true -> LoadingBox */}
            {loading ? <LoadingBox></LoadingBox>
                :
                // If error is true -> MessageBox
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    //else -> products
                    <>
                        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                        <div className="row center">
                            {/* This 'products' is from the backend */}
                            {products.map(product => (
                                <Product key={product._id} product={product}></Product>
                            ))
                            }
                        </div>
                    </>
            }
        </div>
    );
}