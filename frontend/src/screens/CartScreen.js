import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { CART_EMPTY } from '../constants/cartConstants';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    //props.location.search is the same as qty=${qty} from addToCartHandler function
    //from Product Screen
    //props.location.search.split('=')[1] is taking the ${qty} 
    const qty = props.location.search ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        //redirect user to shipping screen
        props.history.push('/signin?redirect=shipping');
    }

    const emptyCartHandler = () => {
        dispatch({ type: CART_EMPTY });
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1 className="shopping-cart-header">Shopping Cart</h1>
                {cartItems.length === 0 ? <MessageBox>
                    Cart is empty.
                    <Link to="/" className="emm">Please Add Some Items <i class="fa fa-cart-plus"></i></Link>
                </MessageBox>
                    :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li key={item.product} className="cart-product">
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className="small"></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                {/* Select Box to change qty of item */}
                                                <select value={item.qty}
                                                    onChange={e => dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                    }
                                                >
                                                    {/* Render options */}
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>${item.price.toFixed(2)}</div>
                                            <div>
                                                <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                    Delete
                                            </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                            <div className="add-product">
                                <Link to="/"><button className="add-more-btn">
                                    Add more <span /><i class="fa fa-cart-plus"></i>
                                </button>
                                </Link>
                            </div>
                            <div className="empty-cart">
                                <button onClick={emptyCartHandler} className="empty-button">Empty Cart </button>
                            </div>
                        </ul>
                    )};
            </div>
            <div className="col-1">
                <div className="card cart-body">
                    <ul >
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block"
                                disabled={cartItems.length === 0}>
                                Proceed To Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
