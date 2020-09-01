const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    role_id : {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
}, {timestamps: true});

const UserRole = mongoose.model('userRole', userRoleSchema);

module.exports = UserRole;