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