//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Bracelet = new Schema({
    id: mongoose.ObjectId,
    model : {
        type : String,
        trim: true,
        required: 'Model name is required',
    },
    couleur: String,
    version: Number,
    url: String, // url Model and then use picasso
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: { createdAt: 'createdAt' } });


module.exports = mongoose.model('Bracelet', Bracelet);
