const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/get-products', productController.getProducts);
router.get('/get-product-by-slug/:id', productController.getProductBySlug);

module.exports = router;




