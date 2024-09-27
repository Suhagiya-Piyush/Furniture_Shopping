const express = require('express');
const forgetRoutes = express.Router();
const { forgetPassword } = require('../controller/forget.controller');

forgetRoutes.post('/', forgetPassword);

module.exports = forgetRoutes;