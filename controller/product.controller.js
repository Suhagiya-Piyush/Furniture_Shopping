// const Product = require('../model/product.model');
const ProductServices = require('../service/product.service');
const ProductService = new ProductServices();

exports.addNewProduct = async (req, res) => {
    try {
        // console.log("body", req.body);
        let product = await ProductService.findProduct({ sku : req.body.sku, isDelete : false});
        console.log(product);
        if(product) return res.json({ message : 'Product Already Exists...'});
        product = await ProductService.addProduct(req.body);
        res.status(202).json({ message : 'Product Added Successfull...', product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let product = await ProductService.getAllProduct({ isDelete : false});
        res.status(202).json({ message : 'Product Found...', product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};