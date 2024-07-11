const mongoose = require("mongoose");

const productSchema  = new mongoose.Schema({
    sku:{
        type: String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required: true,
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
    category:{
        type:String,
    },
    tags:{
        type:[String]
    }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
module.exports= Product;