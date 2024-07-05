const express = require("express");

const{ createProduct, getProduct, getProductById, updateProductById, bulkUpdateProduct }= require("../controllers/productController")

const router = express.Router()

router.route('/bulk-update').put(bulkUpdateProduct);

router.route("/")
.post(createProduct).get(getProduct);

router.route("/:id").get(getProductById).put(updateProductById);

module.exports = router;