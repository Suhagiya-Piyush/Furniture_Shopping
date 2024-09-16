// const Product = require('../model/product.model');
const ProductServices = require('../service/product.service');
const ProductService = new ProductServices();
const fs = require('fs');
const path = require('path');
const { token } = require('morgan');

exports.addNewProduct = async (req, res) => {
    try {
        let imagePath = '';
        
        // console.log("body", req.body);
        let product = await ProductService.findProduct({ sku : req.body.sku, isDelete : false});
        // console.log(product);
        if(product) return res.json({ message : 'Product Already Exists...'});
        if(req.file){
            imagePath = req.file.path.replace(/\\/g, '/');
            // console.log("ImgPath", imagePath);
        }
        // console.log(imagePath);
        
        product = await ProductService.addProduct({...req.body, imagePath});
        res.status(202).json({ message : 'Product Added Successfull...', product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let product = await ProductService.getAllProduct({ isDelete : false});
        res.status(202).json({ message : 'Product Found success...', product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let product = await ProductService.findProduct({ _id : req.query.id, isDelete : false});
        if (!product) {
            res.status(404).json({message : 'Product Not Found...'});
        }
        // console.log("Product", product);
        product = await ProductService.updateProduct(product._id, req.body);
        res.status(202).json({ message : 'Product Update Successfull...', product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        // console.log("log");
        let product = await ProductService.findProduct({ _id : req.query.id, isDelete : false});
        console.log(product);
        if (!product) {
            return res.status(404).json({message : 'Product Not Found...'});
        }
        product = await ProductService.updateProduct(product._id, {isDelete : true});
        res.status(202).json({ message : 'Product Deleted Successfully...', product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};