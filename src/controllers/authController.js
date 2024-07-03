import User from "../models/User";
import { errorHandler } from "../utils/errorHandler";


export const signin = async(req,res,next)=>{
    const {userName,password} = req.body;

    try {
        const validUser = await User.findOne({userName:userName});
        if(!validUser) return next(errorHandler(404,"User not found"));
        
    } catch (error) {
        
    }
}