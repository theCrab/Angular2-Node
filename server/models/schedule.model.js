//ALan:生產的排程
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
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

module.exports = mongoose.model('Schedule', schema);