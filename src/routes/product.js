const express = require("express");

const{ createProduct, getProduct, getProductById }= require("../controllers/productController")

const router = express.Router()

router.route("/")
.post(createProduct).get(getProduct);

router.route("/:id").get(getProductById);

module.exports = router;