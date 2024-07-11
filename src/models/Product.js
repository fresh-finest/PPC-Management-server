const mongoose = require("mongoose");

const productSchema  = new mongoose.Schema({
    sku:{
        type: String,
        
        unique:true
    },
    title:{
        type:String,
        
    },
    campaigns:{
        type:Number,
    },
    ctr:{
        type:Number,
    },
    impressions:{
        type:Number,
    },
    spend:{
        type:Number,
    },
    clicks:{
        type:Number,
    },
    cpc:{
        type:Number,
    },
    acos:{
        type:String,
    },
    
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
module.exports= Product;