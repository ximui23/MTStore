import Axios from "axios";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try{
        //getting data from backend
        const {data} = await Axios.get('/api/products');
        //dispatch action: change state of redux
        //base on this we can update the homescreen and show products
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});

    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, payload: data
        });
    }
    catch(error)
    {
        dispatch({type: PRODUCT_DETAILS_FAIL,
        //error.response is the message from backend,
        //error.message is the general error
        payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
        })
    }

}