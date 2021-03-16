import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
            //action.payload comes from userActions: dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
            // action.payload comes from userActions: type: USER_SIGNIN_FAIL, 
            // payload: error.response && error.response.data.message 
            // ? error.response.data.message
            // : error.message,
        case USER_SIGNOUT:
            return {}; // return empty object -> data inside userInfo should be removed
        default:
            //set default case to avoid error, it returns previous state
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
            //action.payload comes from userActions: dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
            // action.payload comes from userActions: type: USER_SIGNIN_FAIL, 
            // payload: error.response && error.response.data.message 
            // ? error.response.data.message
            // : error.message,
        default:
            //set default case to avoid error, it returns previous state
            return state;
    }
};