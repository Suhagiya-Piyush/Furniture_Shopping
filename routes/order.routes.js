const express = require('express');
const orderRoutes = express.Router();
const { addNewOrder, getOrder } = require('../controller/order.controller');
const { verifyToken } = require('../helpers/verifyToken');

orderRoutes.post('/',verifyToken, addNewOrder);
orderRoutes.get('/',verifyToken, getOrder);

module.exports = orderRoutes;