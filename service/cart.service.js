const Cart = require('../model/cart.model');

class CartServices {
    async findCart (body){
        // console.log(body);
        return await Cart.findOne(body);
    };
    async findAllCart (body){
        // console.log(body);
        return await Cart.find(body);
    };
    async addToCart (body) {
        return await Cart.create(body);
    }
};

module.exports = CartServices;