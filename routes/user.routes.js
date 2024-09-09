const express = require('express');
const userRoutes = express.Router();
const { registerNewUser, loginUser } = require('../controller/user.controller');
const { verifyToken } = require('../helpers/verifyToken');

userRoutes.post('/', registerNewUser);
userRoutes.post('/login', loginUser);

userRoutes.get('/', verifyToken, (req, res)=> res.status(200).json({user : req.user}));

module.exports = userRoutes;