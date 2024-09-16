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