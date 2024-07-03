import User from "../models/User";
import { errorHandler } from "../utils/errorHandler";

const bcrypt = require('bcryptjs');


export const signin = async(req,res,next)=>{
    const {userName,password} = req.body;

    try {
        const validUser = await User.findOne({userName:userName});
        if(!validUser) return next(errorHandler(404,"User not found"));
        const validPassword = bcrypt.compare(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Wrong Credential."));
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        // Implement Rate limit
        res
        .cookie("access_token",token,{httpOnly:true})
        .status(200)
        .jsonm(rest);
        
    } catch (error) {
        next(error)
    }
}