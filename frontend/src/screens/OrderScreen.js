import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    //define a hook to get status of Paypal SDK
    const [sdkReady, setSdkReady] = useState(false);
    //fetch orderDetails from redux store
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    //get orderPay from redux
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;    //rename error to errorPay
    const dispatch = useDispatch();

    //if 'success' from orderCreate is true, this function will run
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');   //data contains client id
            //create script element 
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            //onload happens when the script 'https://www.paypal.com/sdk/js?client-id=${data}' 
            //downloaded in the browser and ready to use
            script.onload = () => {
                setSdkReady(true);
            };
            //adding script as the last child into body of document (html body)
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            //the order does not exist 
            // -> load order from backend
            dispatch(detailsOrder(orderId));
        }
        else {
            //order exist
            if (!order.isPaid) {
                //order is not paid,
                if (!window.paypal) {
                    //if paypal window has not loaded
                    //call addPayPalScript
                    addPayPalScript();
                }
                else {
                    //unpaid order and paypal window already loaded
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, order, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    return loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    {/* List of items */}
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                    :
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{order.paymentMethod} <br />
                                </p>
                                {order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                    :
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        order.orderItems.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small"></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items:</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping:</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax:</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total:</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                //check if order isPaid is false
                                !order.isPaid && (
                                    //if order is not paid, render this
                                    <li>
                                        {/* if sdkReady is false -> loading */}
                                        {!sdkReady ? (<LoadingBox></LoadingBox>) :
                                            // if sdkReady is true
                                            (
                                                <>
                                                    {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                                    {loadingPay && <LoadingBox></LoadingBox>}
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                                </>
                                            )
                                        }
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
