import jwt from 'jsonwebtoken'
import mg from 'mailgun-js';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
        //JSON Web Token Secret
        process.env.JWT_SECRET,
        {
            //options: expired in 30 days
            expiresIn: '30d',
        }

    );
};

//authenticate user
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization; //get authorization field from headers
    if (authorization) {
        //if authorization exist, get token from it
        const token = authorization.slice(7, authorization.length); // slice from 7th index to the end of the string
        // authorization format: Bearer XXXXXX => we only get the token part "XXXXXX"
        //use jwt to decrypt token
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            //decode - contains data inside token
            if (err) {
                //token is invalid
                res.status(401).send({ message: 'Invalid Token' });
            }
            else {
                //token is valid
                req.user = decode;
                //decode contains: _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, 
                next();     //pass 'user' as the property of 'req' as the middleware
            }
        })
    }
    else {
        //if authorization does not exist
        res.status(401).send({ message: 'No Token' });
    }
};

//function to authenticate only admin user
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        //if user exist and this user is Admin
        // move to the next middleware
        next();
    }
    else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

export const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

export const payOrderEmailTemplate = (order) => {
    return `<h1>Thanks for shopping with us</h1>
    <p>
    Hi ${order.user.name},</p>
    <p>We have finished processing your order.</p>
    <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
    <table>
    <thead>
    <tr>
    <td><strong>Products</strong></td>
    <td><strong>Quantity</strong></td>
    <td><strong align="right">Price</strong></td>
    </thead>
    <tbody>
    ${order.orderItems.map(
        (item) => `
        <tr>
        <td>${item.name}</td>
        <td align="center">${item.qty}</td>
        <td align="right">$${item.price.toFixed(2)}</td>
        </tr>
        `
    )}
    </tbody>
    <tfoot>
    <tr>
    <td colspan="2">Items Price: </td>
    <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Tax Price: </td>
    <td align="right"> $${order.taxPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Shipping Price: </td>
    <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Total Price: </td>
    <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
    </tr>
    <tr>
    <td colspan="2">Payment Method: </td>
    <td align="right"> ${order.paymentMethod}</td>
    </tr>
    </tfood>
    </table>
    <h2>Shipping address</h2>
    <p>
    ${order.shippingAddress.fullName},<br/>
    ${order.shippingAddress.address},<br/>
    ${order.shippingAddress.city},<br/>
    ${order.shippingAddress.country},<br/>
    ${order.shippingAddress.postalCode},<br/>
    </p>
    <hr/>
    <p>
    Thanks for shopping with us.
    </p>
    `;
}