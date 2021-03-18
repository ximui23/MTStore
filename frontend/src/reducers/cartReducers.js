import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // add this 'item' to the cart, which is passed from action's payload
            const item = action.payload;
            //x.product === item.product means comparing the productId of item that we want to add to cart,
            // with the items that are already in cart
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                //if item already existed in cart
                //update the item with new value
                return {
                    ...state,
                    //update cartItems
                    // if x.product === existItem.product return item
                    // else (their productId donot equal) return previous item - x
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x),
                };
            }
            else {
                //if the new 'item' does not exist in cart
                //add new item to cart
                return {
                    ...state, // this means we do not change other properties of cart
                    cartItems: [...state.cartItems, item] //this is concatenating current state of cartItems and new 'item'
                    //adding 'item' at the end ot cartItems array
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                //update cartItems
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
                // filtering out the product that its id is == action.payload
                // and remove that product from cartItems
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,  //keep previous state
                // but update shipping address
                shippingAddress: action.payload
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            };
        case CART_EMPTY:
            return { ...state, cartItems: [] }; //previous state keep the same, but cartItems array is empty
        default:
            return state;
    }
}