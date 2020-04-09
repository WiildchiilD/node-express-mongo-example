//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Bracelet = new Schema({
    id_qr: mongoose.ObjectId,
    couleur: String,
    version: String,
    createdAt: {type: Date, default: Date.now()},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    histories: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'History'
    }]
});


module.exports = mongoose.model('Bracelet', Bracelet);
