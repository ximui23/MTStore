import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    (   //show the table
                        <table className="table">
                            {/* table head */}
                            <thead>
                                {/* table row */}
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* loop over orders and use map function to convert each order objec to jsx format*/}
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        {/* order.paidAt.substring(0, 10) = date of payment (not time) */}
                                        {/* if isPaid is true -> show date else show 'No' */}
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            <button type="button" className="small"
                                                // redirect to /order/${order_id}
                                                onClick={() => { props.history.push(`/order/${order._id}`) }}>
                                                Details
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
            }
        </div>
    );
};
