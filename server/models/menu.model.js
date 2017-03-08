var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    name_E: { type: String },
    
    url: { type: String, required: true },
    //Alan:是否需要登入
    isLogin: { type: Boolean, required: true },
    //Alan:可以看的角色有哪些
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Menu', schema);