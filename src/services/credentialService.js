const Credential = require("../models/Credential");


exports.storeCredentials = async(accessToken, refreshToken, expiresIn)=>{
    const tokenExpiry = new Date();
    tokenExpiry.setSeconds(tokenExpiry.getSeconds()+expiresIn);

    let credentials = await Credential.findOne();
    if(!credentials){
        credentials = new Credential({
            accessToken,
            refreshToken,
            tokenExpiry
        })
    } else{
        credentials.accessToken = accessToken;
        credentials.refreshToken = refreshToken;
        credentials.tokenExpiry = tokenExpiry;
    }
    await Credential.save();
}