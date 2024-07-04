const { createProductService } = require("../services/productService");
const { errorHandler } = require("../utils/errorHandler");

exports.createProduct = async(req,res,next)=>{
    try {
        const result = await createProductService(req.body);

        res.status(201).json({
            status:"Success",
            message:"Successfully created data.",
            result
        })
    } catch (error) {
         next(errorHandler(401,"Couldn't create product."));
    }
}