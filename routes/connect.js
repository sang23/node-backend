const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/node_clinic');

module.exports = mongoose;