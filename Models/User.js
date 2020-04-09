//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
    id_qr: mongoose.ObjectId,
    type: Boolean,
    createdAt: {type: Date, default: Date.now()},
    bracelets: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Bracelet'
    }]
});

module.exports = mongoose.model('User', User);
