const Order = require("../model/order.model");
// const Cart = require("../model/cart.model");

class OrderServices {
    async addOrder (body){
        // console.log(body);
        return await Order.create(body);
    };
    async getOrder(body){
        
        // console.log(body);
        return await Order.find(body);
    };
};

module.exports = OrderServices;