const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionsSchema = new Schema({
    name : {
        type: String,
        required: true
    }
}, {timestamps: true});

const Permissions = mongoose.model('permissions', permissionsSchema);

module.exports = Permissions;