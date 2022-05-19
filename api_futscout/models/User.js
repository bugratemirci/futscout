const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username : {
        type : String,
        required : true,
        unique : true,
        minlength : 5
    },
    password : {
        required : true,
        type : String,
        minlength : 7
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
