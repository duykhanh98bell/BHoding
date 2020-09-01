const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolePermissionsSchema = new Schema({
    role_id : {
        type: Schema.Types.ObjectId,
        ref: 'role'
    },
    permissions_id : {
        type: Schema.Types.ObjectId,
        ref: 'permissions'
    }
}, {timestamps: true});

const rolePermissions = mongoose.model('rolePermissions', rolePermissionsSchema);

module.exports = rolePermissions;