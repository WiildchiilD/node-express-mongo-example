//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var History = new Schema({
    id: mongoose.ObjectId,
    longitude: String,
    latitude: String,
    createdAt: {type: Date, default: Date.now()},
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('History', History);
