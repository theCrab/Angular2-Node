const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const {Schedule} = require('./schedule.model');

let schema = new Schema({
    deviceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    data: { type: Object },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createData: { type: Date, required: true, default: Date.now },
    schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }]
});

schema.post('remove', removeObj);
schema.post('findOneAndRemove', removeObj);

function removeObj(device) {
   Schedule.find({ 'device': device }, function (err, schedules) {
        schedules.forEach(function (schedule) {
            schedule.remove();
        })
    });
}

schema.plugin(deepPopulate, {
    populate: {
        'schedule.production': {
            select: ['name', 'creator'],
        }　,
        'schedule.production.creator': {
            select: ['firstName', 'lastName'],
        }
    }
});
module.exports.Device = mongoose.model('Device', schema);