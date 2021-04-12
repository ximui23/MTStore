import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js'

const productRouter = express.Router();

// productRouter.get('/top-products', expressAsyncHandler(async (req, res) => {
//     const topProducts = Product.find({});  //sort by product descending (-1)
//     res.send(topProducts);
// }));

//creating api to send list of products to frontend
// '/' will be added at the end of /api/products 
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder = order === 'lowest' ? { price: 1 }
        : order === 'highest' ? { price: -1 }
            : order === 'topRated' ? { rating: -1 }
                : { _id: -1 }; // order === newest -> sort it by id from newest upload
    const products = await Product.find({
        ...nameFilter,
        ...categoryFilter, ...priceFilter, ...ratingFilter
    }).sort(sortOrder); // find ({}) empty => return everything
    res.send(products);
}));

//API for getting categories from Product
productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);

    res.send({ createdProducts });
}));

//details product api
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

//post request because we create a resource in backend
// /api/products
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name' + Date.now(),
        image: '/images/citrine.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description'
    });

    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
}));

//api put request to update/edit product details in product list of admin user
// '/:id, this is the id of the product that is editing.
productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    //getting product from database
    const product = await Product.findById(productId);

    if (product) {
        //fill product info by its data from frontend
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        //save updated product
        const updatedProduct = await product.save();

        //send back this object to frontend
        res.send({ message: 'Product Updated', product: updatedProduct });
    }
    else {
        //if product does not exist
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

//API for create a review
productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    //getting product from database
    const product = await Product.findById(productId);

    if (product) {
        if (product.reviews.find(x => x.name === req.user.name)) {
            return res.status(400).send({ message: 'Your already submitted a review' });
        }

        const review = { name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment };

        //adding this review to Review array using push command
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;

        //save updated product
        const updatedProduct = await product.save();

        //send back this object to frontend
        res.status(201).send({
            message: 'Review Created',
            review: updatedProduct.reviews[updatedProduct.reviews.length - 1]
        });   //updated with the lated review
    }
    else {
        //if product does not exist
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

export default productRouter;