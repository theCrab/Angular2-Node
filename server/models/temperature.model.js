var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    deviceId: { type: String, required: true },
    temperature: { type: Number, required: true },
    time: { type: Date, required: true },
    type:{ type: String }
});

module.exports = mongoose.model('Temperature', schema);