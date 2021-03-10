import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = {loading: true, products: [] }, action) => {
    // action.type are PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, or PRODUCT_LIST_FAIL
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            //when request, we need to wait for backend 
            // then loading is true
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            //fetch products - variable from redux store
            // action.payload = data from backend from productAction.js
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product: {}, loading: true}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}