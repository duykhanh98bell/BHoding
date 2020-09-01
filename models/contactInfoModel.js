const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactInfoSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    businessRegisterNumber: {
        type: Number,
        required: true
    },
    dateProvided: {
        type: String,
        required: true
    },
    grantingAgencies: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ContactInfo = mongoose.model('contactInfo', contactInfoSchema);

module.exports = ContactInfo;