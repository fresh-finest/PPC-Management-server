const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    Designation:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
},{Timestamps:true})

const User = mongoose.model("User",userSchema);
module.exports = User;