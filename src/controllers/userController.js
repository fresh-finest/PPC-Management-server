const { createUserService, getAllUserService } = require("../services/userService")


exports.createUser = async(req,res,next)=>{
    try {
        const result  = await createUserService(req.body);
        res.status(201).json({
            status:"Success",
            message:"Successfully added new user.",
            result
        })
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't create data.",
            error:error.message
        })
    }
}


exports.getAllUser=async(req,res,next)=>{
    try {
        const result = await getAllUserService();

       res.status(200).json({
        status:"Success",
        message:"Successfully fetched data.",
        result  
       })
    } catch (error) {
        res.status(404).json({
            status:"Fails",
            message:"Couldn't fetch data.",
            error:error.message
        })
    }
}