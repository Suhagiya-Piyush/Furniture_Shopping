const OrderServices = require('../service/order.service');
const OrderService = new OrderServices();

const CartServices = require('../service/cart.service');
const CartService = new CartServices();

exports.addNewOrder = async (req, res) => {
    try {
        // console.log(req.user._id);
        let cart = await CartService.findAllCart({userId : req.user._id, isDelete : false}, req.query);
        // console.log(cart);
        if(cart.length < 1) return res.json({message : 'Cart is Empty..'});
        let orderItems = cart.map((item)=>({
            productId : item.productId._id,
            quantity : item.quantity,
            productPrice : item.productId.productPrice,
            Amount : item.quantity * item.productId.productPrice,
        }));
        // console.log(orderItems);
        let amount = orderItems.reduce((total, items)=>(total += items.Amount),0);
        // console.log(amount);
        let order = await OrderService.addOrder({userId : req.user._id, items : orderItems, totalPrice : amount});
        // console.log(req.user._id);
        await CartService.updateAllCarts({userId : req.user._id, isDelete : false},{isDelete : true});
        res.status(202).json({message : "Order Added Success...", order});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error..." });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await OrderService.getOrder({userId : req.user._id, isDelete : false});
        res.status(200).json({message : 'Your Order...', order});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error..." });
    }
};