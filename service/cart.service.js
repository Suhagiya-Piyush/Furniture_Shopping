const Cart = require("../model/cart.model");

class CartServices {
  async findCart(body) {
    // console.log(body);
    return await Cart.findOne(body);
  };
  async findAllCart(body, query) {
    // console.log(body);
    let populateFiled = '';
    if (query?.isShow === "true") {
      populateFiled = "productId";
    }
    return await Cart.find(body).populate(populateFiled);
  };
  async addToCart(body) {
    return await Cart.create(body);
  };
  async updateCart(id, body) {
    return await Cart.findByIdAndUpdate(id, { $set: body }, { new: true });
  };
  async updateAllCarts(filter,body){
    // console.log(body);
    return await Cart.updateMany(filter,body);
  };
}

module.exports = CartServices;
