const {
  createProductService,
  getProductService,
  getproductServiceById,
  updateProductServiceById,
  bulkDeleteProductService,
  bulkUpdateProductService,
  deleteProductServiceById,
} = require("../services/productService");
const { errorHandler } = require("../utils/errorHandler");

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully added data.",
      result,
    });
  } catch (error) {
    next(errorHandler(400, "Couldn't create product."));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const result = await getProductService();

    res.status(200).json({
      status: "Success",
      message: "Succesfully fetched product.",
      result,
    });
  } catch (error) {
    next(errorHandler(500, "Couldn't fetch data."));
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getproductServiceById(id);
    res.status(200).json({
      status: "Success",
      message: "Successfully fetch data.",
      result,
    });
  } catch (error) {
    next(errorHandler(400, "Couldn't fetch data."));
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateProductServiceById(id, req.body);

    res.status(200).json({
      status: "Success",
      message: `Successfully updated product`,
      result,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(400, "Couldn't updated data."));
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const products = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Invalid input: expected an array of products.",
      });
    }

    const result = await bulkUpdateProductService(products);

    res.status(200).json({
      status: "Succcess",
      message: "Products updated successfully",
      result,
    });
  } catch (error) {
    next(errorHandler(500, "An error occurd while updataing products."));
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductServiceById(id);
    res.status(200).json({
      status: "Success",
      message: "Product is deleted successfully.",
    });
  } catch (error) {
    // next(errorHandler(500,"An error occurd while deleting products."));
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async(req,res,next)=>{
    try {
      
      const result = await bulkDeleteProductService(req.body.ids);
  
      if(!result.deletedCount){
        return res.status(400).json({
          status:'Fails',
          error : "Could not deleted the data"
        })
      }
      res.status(200).json({
        status: 'Success',
        message:`${result.deletedCount} data are Successfully deleted data`,
        result
    })
      
    } catch (error) {
      res.status(400).json({
        status: 'Fails',
        message:'Data is not deleted.',
        error: error.message
    })
    }
  }