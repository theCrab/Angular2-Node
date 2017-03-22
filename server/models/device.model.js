var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schedule = require('./schedule.model');

var schema = new Schema({
    deviceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    data: { type: Object },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createData: { type: Date, required: true, default: Date.now }
});

schema.post('findOneAndRemove', function (device) {
    Schedule.find({ 'device': device }, function (err, schedules) {
        schedules.forEach(function (schedule) {
            schedule.remove();
        })
    });
});

module.exports = mongoose.model('Device', schema);