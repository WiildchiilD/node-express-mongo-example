//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var BModel = new Schema({
    id: mongoose.ObjectId,
    name: {
        type: String,
        trim: true,
        required: 'Model name is required',
    },
    couleur: String,
    version: Number,
    url: String, // url Model and then use picasso
}, {timestamps: {createdAt: 'createdAt'}});

module.exports = mongoose.model('BModel', BModel);
