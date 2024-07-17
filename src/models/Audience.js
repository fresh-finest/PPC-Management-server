const mongoose = require('mongoose');

const audienceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
