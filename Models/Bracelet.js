//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Bracelet = new Schema({
    id: mongoose.ObjectId,
    model : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: {createdAt: 'createdAt'}});


module.exports = mongoose.model('Bracelet', Bracelet);
