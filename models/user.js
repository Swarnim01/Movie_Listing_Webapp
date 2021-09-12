const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favourite:[
        { movieId :{ type:String } , poster_path : {type:String}}
    ]
});

var Users =  mongoose.model('User',UserSchema);
module.exports = Users;