const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marketingSystemSchema = new Schema({
    link : {
        type: String,
        required: true
    }
}, {timestamps: true});

const MarketingSystem = mongoose.model('marketingSystem', marketingSystemSchema);

module.exports = MarketingSystem;