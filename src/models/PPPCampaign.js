const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    name: {
        type: String,
    },
    budget: {
        type: Number,
    },
    bidOptimization: {
        type: String,
    },
    portfolioId: {
        type: Number,
    },
    adFormat: {
        type: String,
    },
    campaignId: {
        type: String,
    },
    budgetType: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    state: {
        type: String,
    },
    servingStatus: {
        type: String,
    },
    creative: {
        type:String
},
    landingPage:{
        type:String
    }
}, { timestamps: true });

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
