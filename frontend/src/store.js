import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { userSigninReducer } from './reducers/userReducers';

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
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;