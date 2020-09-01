const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model('product', productSchema);

module.exports = Product;