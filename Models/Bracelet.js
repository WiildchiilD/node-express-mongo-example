//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Bracelet = new Schema({
    id_qr: mongoose.ObjectId,
    model : String,
    couleur: String,
    version: Number,
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    histories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History'
    }]
}, { timestamps: { createdAt: 'createdAt' } });


module.exports = mongoose.model('Bracelet', Bracelet);
