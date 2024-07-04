const Product = require("../models/Product")

exports.createProductService = async(data)=>{
    const product = await Product.create(data);
    return product;
}

exports.getProductService = async()=>{
    const product = await Product.find({});
    return product;
}

exports.getproductServiceById = async(id)=>{
    const product = await Product.findOne({_id:id});
    return product;
}

exports.updateServiceById = async(id,data)=>{
    const product = await Product.updateOne(
        {_id:id},
        {
            $set:data,
        },
        {runValidators:true}
    )
    return product;
}

exports.bulkUpdateProductService = async(data)=>{
    const updateOperations = data.map((product)=>({
        updateOne:{
            filter:{_id:product._id},
            update:{$set:product}
        }
    }));

    const updateProducts = await Product.bulkWrite(updateOperations);
    return updateProducts;
}

exports.deleteProductById = async(id)=>{
    const deleteProduct = await Product.deleteOne({_id:id});
    return deleteProduct;
}

exports.bulkDeleteProductService = async(ids)=>{
    const result = await Product.deleteMany({_id:ids});
    return result;
}

/*

exports.bulkDeleteProductService = async(ids)=>{

    if(!Array.isArray(ids) || ids.length === 0){
       throw new Error("Invalid input: 'ids' must be a non-empty array.");
    }

    const result = await Product.deleteMany({
        _id:{$in: ids}
    });
    return result;
    }

*/