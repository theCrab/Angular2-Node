var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    deviceId: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: Object },
    creator: { type: Schema.Types.ObjectId, ref: 'User' , required: true }
});

module.exports = mongoose.model('Device', schema);