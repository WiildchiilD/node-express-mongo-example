//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var User = new Schema({
    id_qr: mongoose.ObjectId,
    firstname : {
        type: String,
        trim: true,
        required: 'First name required',
        minLength : 3
    },
    lastname: {
        type: String,
        trim: true,
        required: 'Last name is required',
        minLength : 3
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type: String,
        trim: true,
        required: true,
        minLength : 6
    },
    type: Boolean,
    createdAt: {type: Date, default: Date.now()},
    bracelets: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Bracelet'
    }]
});

module.exports = mongoose.model('User', User);
