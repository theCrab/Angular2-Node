const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const { Schedule } = require('./schedule.model');

let schema = new Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true },
    //Alan:要求時間
    requireDate: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createData: { type: Date, required: true },

    state: { type: Boolean },
    //Alan:完成時間
    finishDate: { type: Date },
    //Alan:這個產品可能有多個生產過程進行
    schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }]
});

// set the relation between production and schedule

// when remove production, remove all schedule which use this production
schema.post('remove', removeObj);
schema.post('findOneAndRemove', removeObj);

function removeObj(production) {
    Schedule.find({ 'production': production }, function (err, schedules) {
        if (!err && schedules) {
            schedules.forEach(function (schedule) {
                setTimeout(function () {
                    schedule.remove();
                }, 200);
            })
        }
    });
}
// schema.pre('save', function(doc) {
//     console.log('save');
//     next();
// });

schema.plugin(deepPopulate, {
    populate: {
        'schedule.device': {
            select: ['name', 'creator'],
        }　,
        'schedule.device.creator': {
            select: ['firstName', 'lastName'],
        }
    }
});

module.exports.Production = mongoose.model('Production', schema);