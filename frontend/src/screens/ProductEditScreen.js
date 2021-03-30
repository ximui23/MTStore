import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    //dispatch details product -> useEffect
    useEffect(() => {
        if (!product || (product._id !== productId)) {
            //if product is null => we did not load product
            //so we need to load it from back end
            dispatch(detailsProduct(productId));
        }
        else {
            //if product is not null and it contains value
            // => set the name's field in the ui with the data from back end
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [
        product, productId, dispatch,    //when there is a change in each of these variables -> useEffect will run again

    ]);

    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>Edit Product {productId}</h1></div>
                {loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter Product name" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input id="price" type="text" placeholder="Enter Product Price" value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input id="image" type="text" placeholder="Enter Image" value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input id="category" type="text" placeholder="Enter Product Category" value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input id="countInStock" type="text" placeholder="Enter Product Quantity" value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea id="description" rows="3" type="text" placeholder="Enter Product Description" value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label></label>
                                <button className="primary" type="submit">
                                    Update
                                </button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}
