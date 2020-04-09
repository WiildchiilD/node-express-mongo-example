//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var History = new Schema({
    id_qr: mongoose.ObjectId,
    longitude: String,
    latitude: String,
    createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('History', History);
