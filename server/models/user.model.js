const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
});

schema.plugin(mongooseUniqueValidator);

module.exports.User = mongoose.model('User', schema);