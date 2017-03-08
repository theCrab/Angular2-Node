var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    name_E: { type: String },

    level: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true },

    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Role', schema);