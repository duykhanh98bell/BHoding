const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const introduceSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Introduce = mongoose.model('introduce', introduceSchema);

module.exports = Introduce;