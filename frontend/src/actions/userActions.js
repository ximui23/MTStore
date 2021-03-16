import Axios from 'axios'
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const register = (name, email, password) => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {email, password}});
    try{
        // Success
        // fetch {data} from a post request
        const {data} = await Axios.post('api/users/register', {name, email, password});
        //Now the email and password are correct, 'data' contains user info and token -> dispatch
        dispatch({type: USER_REGISTER_SUCCESS, 
            payload: data});
        //update Redux store base on user signin
        //Because in App.js, we read userSignin to authenticate userInfo
        dispatch({type: USER_SIGNIN_SUCCESS, 
            payload: data});
        //keep user sign in even they close the browser and open it again
        localStorage.setItem("userInfo", JSON.stringify(data)); //key is "userInfo"

    }catch(error)
    {
        dispatch({type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

export const signin = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try{
        // Success
        // fetch {data} from a post request
        const {data} = await Axios.post('api/users/signin', {email, password});
        //Now the email and password are correct, 'data' contains user info and token -> dispatch
        dispatch({type: USER_SIGNIN_SUCCESS, 
            payload: data});
        //keep user sign in even they close the browser and open it again
        localStorage.setItem("userInfo", JSON.stringify(data)); //key is "userInfo"

    }catch(error)
    {
        dispatch({type: USER_SIGNIN_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

export const signout = () => (dispatch) => {
    //remove userInfo from localStorage
    localStorage.removeItem('userInfo');
    //remove cartItems when user log out
    localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGNOUT});
};