var mongoose = require('../connect');
var repairMediceenSchema = new mongoose.Schema({
    mediceen_id: mongoose.Schema.Types.ObjectId,
    repair_id: mongoose.Schema.Types.ObjectId,
    qty:Number,
    remark:String
}, { collection: 'repair_mediceen'});

module.exports = repairMediceenSchema;