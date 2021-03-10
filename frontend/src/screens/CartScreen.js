import React from 'react'

export default function CartScreen(props) { 
    const productId = props.match.params.id;
    //props.location.search is the same as qty=${qty} from addToCartHandler function
    //from Product Screen
    //props.location.search.split('=')[1] is taking the ${qty} 
    const qty = props.location.search ? Number(props.location.search.split('=')[1])
    : 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>ADD TO CART: ProductID: {productId} Qty: {qty}</p>
        </div>
    )
}
