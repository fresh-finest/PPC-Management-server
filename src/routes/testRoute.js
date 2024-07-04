const express = require('express');
const router = express.Router();
const productController = require('../controllers/testController');

router.get('/fetch', productController.fetchAndStoreTestProducts);

router.get('/', productController.getTestProducts);

module.exports = router;
