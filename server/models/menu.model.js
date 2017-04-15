const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    routerLink: { type: String, required: true },
    routerTitle: { type: String, required: true },
    routerIcon: { type: String, default: 'fa fa-eye' },
    routerTitle_E: { type: String },
    //Alan:是否需要登入
    isLogin: { type: Boolean, required: true, default: false },
    sort: { type: Number, default: 0 },
    //Alan:可以看的角色有哪些
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports.Menu = mongoose.model('Menu', schema);