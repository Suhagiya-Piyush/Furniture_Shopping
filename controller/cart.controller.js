// const Cart = require('../model/cart.model');
const CartServices = require('../service/cart.service');
const CartService = new CartServices();

exports.addToCart = async (req, res) => {
    try {
        // console.log("Cart User",req.user._id);
        let cart = await CartService.findCart({userId : req.user._id, productId : req.body.productId, isDelete : false});
        // console.log("Cart",cart);
        if(cart) {
            cart.quantity += (req.body.quantity) || 1;
            await cart.save();
            return res.status(200).json({ message : 'product Added To Cart susses', cart });
        }
        // console.log("Body Data",req.body);
        cart = await CartService.addToCart({ userId : req.user._id, ...req.body });
        res.status(201).json({ message: "Added to Cart...", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error..." });
    }
};
exports.getCarts = async (req, res) => {
    try {
        const cart = await CartService.findAllCart({userId : req.user._id, isDelete : false});
        if(cart.length < 1) return res.json({message : 'Cart is Empty...'});
        res.status(200).json({ message : "Cart Products...", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error..." });
    }
};

exports.updateCarts = async (req, res) => {
    try {
        // console.log(req.user._id);
        // console.log(req.body.productId);
        let cart = await CartService.findCart({ userId : req.user._id, productId : req.body.productId, isDelete : false });
        // console.log(cart);
        cart = await CartService.updateCart(cart._id, {quantity : req.body.quantity});
        res.status(202).json({ message : 'Cart Update Successfully...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error..." });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await CartService.findCart({ userId : req.user._id, productId : req.body.productId, isDelete : false });
        cart = await CartService.updateCart(cart._id, {isDelete : true});
        res.status(202).json({ message : 'Product Delete to Cart Success...', cart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error..." });
    }
};