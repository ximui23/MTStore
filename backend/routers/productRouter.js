import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

//creating api to send list of products to frontend
// '/' will be added at the end of /api/products 
productRouter.get('/', expressAsyncHandler(async (req,res) => {
    const products = await Product.find({}); // find ({}) empty => return everything
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);

    res.send({createdProducts});
}));

//details product api
productRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product Not Found'});
    }
}));

export default productRouter;