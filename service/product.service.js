const Product = require('../model/product.model');

class ProductServices {
    async addProduct (body) {
        return await Product.create({...body});  
    };
    async findProduct (body) {
        // console.log('new====', body);
        return await Product.findOne(body);
    };
    async getAllProduct (body) {
        // console.log(body);
        
        return await Product.find({isDelete : false});
    }
};

module.exports = ProductServices;