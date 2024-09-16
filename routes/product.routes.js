const express = require("express");
const productRoutes = express.Router();
const {
  addNewProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product.controller");
const { upload } = require('../helpers/productimageUpload');

productRoutes.post("/addProduct", upload.single("productImage"), addNewProduct);
productRoutes.get("/", getAllProduct);
productRoutes.put("/updateProduct", updateProduct);
productRoutes.put("/deleteProduct", deleteProduct);

module.exports = productRoutes;
