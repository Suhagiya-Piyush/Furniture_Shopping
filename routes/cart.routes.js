const express = require("express");
const cartRoutes = express.Router();
const {
  addToCart,
  getCarts,
  updateCarts,
  deleteCart
} = require("../controller/cart.controller");
const { verifyToken } = require("../helpers/verifyToken");

cartRoutes.post("/", verifyToken, addToCart);
cartRoutes.get("/", verifyToken, getCarts);
cartRoutes.post("/update", verifyToken, updateCarts);
cartRoutes.put("/delete", verifyToken, deleteCart);

module.exports = cartRoutes;
