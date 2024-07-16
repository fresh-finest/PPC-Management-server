const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema({
accessToken: String,
refreshTokem:String,
tokenExpiry:Date
}, { timestamps: true });

const Credential = mongoose.model("User", credentialSchema);
module.exports = Credential;
