const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username : {
        type : String,
        required : true,
        unique : true,
        minlength : 1
    },
    password : {
        required : true,
        type : String,
        minlength : 1
    },
    team : String,
    mail : {
        type : String,
        required : true,
        unique : true
    },
    tel : String
});

module.exports = mongoose.model('Users', UserSchema, 'Users');
