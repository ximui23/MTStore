import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth, isAdmin } from '../utils.js';

const orderRouter = express.Router();

//list of orders api for admin user.
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    //admin -> get all orders
    const orders = await Order.find({}).populate('user', 'name');
    //use populate: from 'user' only get the 'name' of user
    res.send(orders);
}));

//get orders from backend and send to frontend
//only authenticated user can access - sign in user
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}));

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

// /api/orders/:id, isAuth -> only authenticated user can see order detail
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    // req.params.id is the ':id' - what user enter
    const order = await Order.findById(req.params.id);  //findById is a method from mongoose
    if (order) {
        res.send(order);
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}));

//update the status of payment -> put request 
//second parameter 'isAuth' -> only logged in user can make payment
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        //if order exist
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id, status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        //save the updated order
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder }); //second parameter: send back the order to frontend
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }

}));

export default orderRouter;