import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

//create API for post request to /api/order
// '/' root is /api/orders
orderRouter.post(
    '/',
    isAuth,    //by calling 'next()' inside isAuth, req.user will be filled by user info
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status.send(400).send({ message: 'Cart is empty' });
        }
        else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id, //we need id of the user create this order
            });
            const createdOrder = await order.save();    //create and save order into database
            res.status(201).send({ message: 'New Order Created', order: createdOrder });  //pass 'order' to frontend using 'order: createdOrder'
        }
    }));

export default orderRouter;