var mongoose = require('../connect');
var mediceenSchema = new mongoose.Schema({
    code: String,
    name: String,
    buy: Number,
    sale: Number,
    remark: String,
}, { collection: 'mediceen'});

module.exports = mediceenSchema;