import jwt from 'jsonwebtoken'

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