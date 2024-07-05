const express = require("express");

const {
  createProduct,
  getProduct,
  getProductById,
  updateProductById,
  bulkUpdateProduct,
  deleteProductById,
  bulkDeleteProduct,
} = require("../controllers/productController");


const router = express.Router();

router.route("/bulk-update").put(bulkUpdateProduct);
router.route("/bulk-delete").delete(bulkDeleteProduct);

router.route("/").post(createProduct).get(getProduct);

router.route("/:id").get(getProductById).put(updateProductById).delete(deleteProductById);



module.exports = router;
