const bcrypt = require('bcryptjs');

const { createUserService, getAllUserService, deleteUserServiceById, updateUserServiceById ,getUserServiceByEmail} = require("../services/userService")


exports.createUser = async(req,res,next)=>{
    try {

        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const newUser ={
            ...req.body,
            password: hashedPassword
        }

        const result  = await createUserService(newUser);

    
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

       
        const userWithoutPassword = result.map(user=>{
            const {password,...userWithoutPassword} = user._doc;
            return userWithoutPassword;
        })
        
       res.status(200).json({
        status:"Success",
        message:"Successfully fetched data.",
        result: userWithoutPassword
       })
    } catch (error) {
        res.status(404).json({
            status:"Fails",
            message:"Couldn't fetch data.",
            error:error.message
        })
    }
}

exports.getUserByEmail=async(req,res)=>{
   try {
    const {email} = req.params;
    const result = await getUserServiceByEmail(email);
    res.status(200).json({
        status:"Success",
        message:"Successfully got single user by email",
        result
    })
   } catch (error) {
    res.status(500).json({
        status:"Fails",
        message:"Couldn't fetch user.",
        error:error.message
    })
   }

}

exports.deleteUserById = async(req,res,next)=>{
    try {
        const {id} = req.params;

        const result = await deleteUserServiceById(id);

        res.status(200).json({
            status:"Success",
            message:"Successfully deleted user"

        })
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't deleted user.",
            error:error.message
          })
       }
    }


exports.updateUserById = async(req,res,next)=>{
    try {

        const {id} = req.params;

        const result = await updateUserServiceById(id,req.body);
        res.status(200).json({
            status:"Success",
            message:"Successfully updated data.",
            result
        })
        
    } catch (error) {
       res.status(400).json({
         status:"Fails",
         message:"Couldn't updated user.",
         error:error.message
       })
    }
}
