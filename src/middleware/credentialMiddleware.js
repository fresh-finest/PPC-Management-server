const Credential = require("../models/Credential")
const axios = require('axios');
const { storeCredentials } = require("../services/credentialService");

const TOKEN_URL = 'https://api.amazon.com/auth/o2/token';
const CLIENT_ID = 'amzn1.application-oa2-client.c643907b96714c51944add2756b379c2';
const CLIENT_SECRET = 'amzn1.oa2-cs.v1.475df9ac07ff0e1af86cc7beac29746897b217f37af6496e350fba2c748889a1';

const refreshAccessToken  = async()=>{
    const credentials = Credential.findOne();
    if(!credentials){
        throw new Error("No credentials found.")
    }
    try {
        const response = await axios.post(TOKEN_URL,null,{
            params:{
                grant_type:'refresh_token',
                refresh_token:credentials.refreshToken,
                client_id:CLIENT_ID,
                client_secret:CLIENT_SECRET,
            }
        });
        const {access_token, expires_in} = response.data;
        await storeCredentials(access_token,credentials.refreshToken,expires_in);
        return access_token;

    } catch (error) {
        console.log('Error refreshing token: ',error);
        throw new Error('Could not refresh token');
    }
}


exports.ensureAuthenticated = async(req,res,next)=>{
    let credentials = await Credential.findOne();
    if(!credentials){
        return res.status(401).send("No credentials available");
    }
    if (new Date() >= credentials.tokenExpiry){
        try {
            credentials.accessToken = await refreshAccessToken();
        } catch (error) {
            return res.status(500).send('Failed to refresh token');
        }
    }

    req.credentials = credentials;
    next();
}