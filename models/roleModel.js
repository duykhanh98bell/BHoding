const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
}, {timestamps: true});

const Role = mongoose.model('role', roleSchema);

module.exports = Role;