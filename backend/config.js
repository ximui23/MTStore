import dotenv from 'dotenv'

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/mtfengshui',
    JWT_SECRET: process.env.JWT_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'accessKeyId',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'secretAccessKey',
}