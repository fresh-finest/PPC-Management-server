const Product = require("../models/Product")

exports.createProductService = async(data)=>{
    const product = await Product.create(data);
    return product;
}

exports.getProductService = async()=>{
    const product = await Product.find({});
    return product;
}