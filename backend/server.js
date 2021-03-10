// Create a simple Express server
import express from 'express'
import data from './data.js';

const app = express();

// //api returns details of product
// // ':id is the place holder for id of particular product
app.get('/api/products/:id', (req,res) => {
    //req.params.id is the same as :id which user input it in,
    //and we check if that id match with _id that we have in the backend
    const product = data.products.find((x) => x._id === req.params.id);
    console.log(product);
    if(product){
        //if the id matches -> product exist
        res.send(product);
    }
    else{
        //if product does not exist, send error 404 and message to frontend
        res.status(404).send({message: 'Product not Found'});
    }
});

//When frontend enter /api/products
// return an array of products
app.get('/api/products', (rep, res) => {
    res.send(data.products);
});

app.get('/', (req, res) => {
    // body of handler, req = request, res = response
    res.send('Server is ready');
});

//if there is environment port then set it to port
//if not set port = 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
    //default port is 5000
    //this function is run after creating the server
    console.log(`Server at http://localhost:${port}`);
});