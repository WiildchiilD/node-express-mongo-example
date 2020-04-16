//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var History = new Schema({
    id: mongoose.ObjectId,
    longitude: String,
    latitude: String,
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        //,default : null
    },

    bracelet :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bracelet'
    },

}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('History', History);
