const Product = require("../models/Product")

exports.createProductService = async(data)=>{
    const product = await Product.create(data);
    return product;
}