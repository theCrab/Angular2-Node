//ALan:要生產的產品
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schedule = require('./schedule.model');

var schema = new Schema({
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
schema.post('findOneAndRemove', function (production) {
    Schedule.find({ 'production': production }, function (err, schedule) {
        //Alan:因為是陣列，用drop
        if (!err) {
            schedule.forEach(function (item) {
                item.remove();
            });
        }
    });
});

// schema.pre('save', function(doc) {
//     console.log('save');
//     next();
// });

module.exports = mongoose.model('Production', schema);