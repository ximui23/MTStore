import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducer';
import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from "./reducers/productReducers";
import { userAddressMapReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';

const initialState = {
    //to keep user sign in even when user refresh the page
    userSignin: {
        //check localStoreage for userInfo
        userInfo: localStorage.getItem('userInfo')
            //if userInfo exists -> converts it to userInfo object 
            ? JSON.parse(localStorage.getItem('userInfo'))
            //otherwise return null
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')    // value is saved inside localStorage is String
            ? JSON.parse(localStorage.getItem('cartItems')) // use JSON.parse to parse it into array
            : [],                   //if cartItems does not exist return empty array.
        shippingAddress: localStorage.getItem('shippingAddress') //check if shippingAddress exist in localStorage
            ? JSON.parse(localStorage.getItem('shippingAddress')) // if it exists converts it into JS object using JSON parse
            : {}, //otherwise use empty object,
        paymentMethod: 'PayPal', //default value of paymentMethod is PayPal
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productReviewCreate: productReviewCreateReducer,
    userAddressMap: userAddressMapReducer,
    // topProductsList: topProductsListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;