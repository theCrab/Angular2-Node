//ALan:要生產的產品
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Production', schema);