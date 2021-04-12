import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true }, //One user can only post one review per product
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [ReviewSchema],
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;