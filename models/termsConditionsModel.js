const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const termsConditionsSchema = new Schema({
    terms : {
        type: String,
        required: true
    },
    conditions: {
        type:String,
        required: true
    }
}, {timestamps: true});

const TermsConditions = mongoose.model('termsConditions', termsConditionsSchema);

module.exports = TermsConditions;