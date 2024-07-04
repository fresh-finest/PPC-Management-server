const express = require("express");

const{ createProduct, getProduct, getProductById, updateProductById }= require("../controllers/productController")

const router = express.Router()

router.route("/")
.post(createProduct).get(getProduct);

router.route("/:id").get(getProductById).put(updateProductById);

module.exports = router;