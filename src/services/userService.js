const User = require("../models/User")


exports.createUserService = async(data)=>{
    const user = await User.create(data);
    return user;
}

exports.getAllUserService = async()=>{
    const user = await User.find({});
    return user;
}

exports.deleteUserServiceById = async(id)=>{
    const deleteUser = await User.deleteOne({_id:id});
    return deleteUser;
}