import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
    //get productList from redux store through useSelector 
    const productList = useSelector(state => state.productList);

    //get values from productList
    const { loading, error, products } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
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