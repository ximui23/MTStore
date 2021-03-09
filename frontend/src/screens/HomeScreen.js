import React, { useEffect } from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [])

    return (
        <div>
            {/* If loading is true -> LoadingBox */}
            {loading ? <LoadingBox></LoadingBox>
            :
            // If error is true -> MessageBox
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            //else -> products
            <div className="row center">
                {/* This 'products' is from the backend */}
                {products.map(product => (
                    <Product key={product._id} product={product}></Product>
                ))
                }
            </div>
            }           
        </div>
    )
}
