const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    //Alan:預計要生產的時間
    scheduleDate: { type: Date, required: true },
    //Alan:實際生產的時間
    actionDate: { type: Date },
    //Alan:完成時間
    finishDate: { type: Date },


    //Alan:要生產的產品
    production: { type: Schema.Types.ObjectId, ref: 'Production', required: true },
    //Alan:哪一台機器    
    device: { type: Schema.Types.ObjectId, ref: 'Device', required: true },

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createData: { type: Date, required: true },
});

// schema.pre('save', function (schedule) {
// });

schema.post('save', function (schedule) {
    /*
        Alan: put this in there, because can't find batter way to put it top,
        because if put it outer, production import this will fail
        要先找到所有含有這個 schedule 的 production、Device把他們刪除，再新增回去
    */
    let { Device } = require('./device.model');
    let { Production } = require('./production.model');

    Production.findOne({ 'schedule': schedule }, function (err, production) {
        if (!err && production) {
            //if not exit in this schedule push this schedule, others do nothing
            production.schedule.pull(schedule);
            production.save(
                function () {
                    addProduction(Production, schedule);
                });
        } else {
            addProduction(Production, schedule);
        }
    });
    Device.findOne({ 'schedule': schedule }, function (err, device) {
        if (!err && device) {
            device.schedule.pull(schedule);
            device.save(function () {
                addDevice(Device, schedule);
            });
        } else {
            addDevice(Device, schedule);
        }
    });

});

function addDevice(Device, schedule) {
    Device.findById(schedule.device, function (err, d) {
        if (!err) {
            d.schedule.push(schedule);
            d.save();
        }
    });
}
function addProduction(Production, schedule) {
    Production.findById(schedule.production, function (err, p) {
        if (!err) {
            p.schedule.push(schedule);
            p.save();
        }
    });
}

// when remove production, remove all schedule which use this production
schema.post('remove', removeObj);
schema.post('findOneAndRemove', removeObj);

function removeObj(schedule) {
    let { Production } = require('./production.model');
    Production.find({ 'schedule': schedule }, function (err, productions) {
        if (!err) {
            productions.forEach(function (production) {
                production.schedule.pull(schedule);
                production.save();
            });
        }
    });
    let { Device } = require('./device.model');
    Device.find({ 'schedule': schedule }, function (err, devices) {
        if (!err) {
            devices.forEach(function (device) {
                device.schedule.pull(schedule);
                device.save();
            });
        }
    });
}

module.exports.Schedule = mongoose.model('Schedule', schema);