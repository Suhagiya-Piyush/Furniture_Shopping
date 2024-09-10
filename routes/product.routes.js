const express = require('express');
const productRoutes = express.Router();
const { addNewProduct, getAllProduct } = require('../controller/product.controller');

productRoutes.post('/addProduct', addNewProduct)
productRoutes.get('/', getAllProduct)

module.exports = productRoutes;