// Create a simple Express server
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';


dotenv.config();

const app = express();

//Parse or converts body of http req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongoose
//connect to MongoDB database
//if process.env.MONGODBURL does not exist, use 'mongodb://localhost/mtstore'
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mtstore', {
    //options
    useNewUrlParser: true, //get rid of duplicated warnings
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);

//send data from mongoDB database
app.use('/api/products', productRouter);

//path for /api/orders
app.use('/api/orders', orderRouter);

//get the paypal client id from backend and send it to frontend
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); // 'sb' - sandbox
})

//show the images that upload to the '/uploads' folder
const __dirname = path.resolve();
//join the current directory name with '/uploads'
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    // body of handler, req = request, res = response
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

//if there is environment port then set it to port
//if not set port = 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
    //default port is 5000
    //this function is run after creating the server
    console.log(`Server at http://localhost:${port}`);
});