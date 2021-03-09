// Create a simple Express server
import express from 'express'
import data from './data.js';

const app = express();

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