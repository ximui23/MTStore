import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async(dispatch, getState) => {
    //dispatch and getState is from redux-thunk
    //which allows us to dispatch an action, and get the state of redux store

    //send AJAX request to the server to get info about this product
    const {data} = await Axios.get(`/api/products/${productId}`);

    //dispatch an action
    dispatch({
        type: CART_ADD_ITEM, 
        payload:{
            //this payload is an object
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        }
    });
    //preventing Cart is refreshing when we refresh the page
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

//actions remove from cart
export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    });

    //update localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    //save shipping address to localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
}