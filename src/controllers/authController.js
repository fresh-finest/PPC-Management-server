const User = require("../models/User")
const { errorHandler } = require("../utils/errorHandler");

const bcrypt = require('bcryptjs');
const jwt  = require("jsonwebtoken");
const nodemailer = require('nodemailer');


exports.signin = async(req,res,next)=>{
    const {email,password} = req.body;

    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Password."));

        if (!process.env.JWT_SECRET) {
            return next(errorHandler(500, "JWT_SECRET environment variable not set"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'strict' })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}

exports.transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});


exports.forgetPassword = async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).send('User with this email does not exist.');
    }

    const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1h'});

    user.resetPasswordtoken = token;
    user.resetPasswordExpires = Date.now()+3600000; // 1 hour
    await user.save();

    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Password Reset Link",
       html: `<p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password</p>`
    };

    this.transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return res.status(500).send(error.toString());
        }
        res.send('Password reset link has been sent to your email. ');
    })
}



exports.resetPassword = (req,res)=>{
    const {token} = req.params;

    try {
        const {email} = jwt.verify(token,process.env.JWT_SECRET);
        res.send({email,token});
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
}

exports.setPassword = async(req,res)=>{
    const {token} = req.params;

    const password = req.body;

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({
            email:decoded.email, 
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()}
        })

        if(!user){
            return res.status(400).send('Invalid or expired token.');
        }

        user.password = bcrypt.hashSync(password,8);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.send('Password has been reset successfully. ');
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
}
