const User = require("../models/User")
const { errorHandler } = require("../utils/errorHandler");

const bcrypt = require('bcryptjs');
const jwt  = require("jsonwebtoken");

exports.signin = async(req,res,next)=>{
    const {email,password} = req.body;

    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credential."));

        if (!process.env.JWT_SECRET) {
            return next(errorHandler(500, "JWT_SECRET environment variable not set"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'strict' })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}