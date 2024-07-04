const { createProductService, getProductService } = require("../services/productService");
const { errorHandler } = require("../utils/errorHandler");

exports.createProduct = async(req,res,next)=>{
    try {
        const result = await createProductService(req.body);

        res.status(201).json({
            status:"Success",
            message:"Successfully added data.",
            result
        })
    } catch (error) {
         next(errorHandler(400,"Couldn't create product."));
    }
}

exports.getProduct = async(req,res,next)=>{
    try {
        const result = await getProductService();

        res.status(200).json({
            status:"Success",
            message:"Succesfully fetched product.",
            result
        })
    } catch (error) {
        next(errorHandler(500,"Couldn't fetch data."))
    }
}

