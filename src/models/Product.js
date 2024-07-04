const mongoose = require("mongoose");

const productSchema  = new mongoose.Schema({
    asin:{
        type: String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required:true
    },
    tags:{
        type:[String]
    }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
module.exports= Product;