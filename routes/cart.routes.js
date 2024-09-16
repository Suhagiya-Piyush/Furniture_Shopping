const express = require('express');
const cartRoutes = express.Router();
const { addToCart } = require('../controller/cart.controller');
const { verifyToken } = require('../helpers/verifyToken');

cartRoutes.post('/',verifyToken, addToCart);

module.exports = cartRoutes;