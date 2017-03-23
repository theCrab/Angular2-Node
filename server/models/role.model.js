const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    name: { type: String, required: true },
    name_E: { type: String },

    level: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true },

    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports.Role = mongoose.model('Role', schema);