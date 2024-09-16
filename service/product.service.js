const Product = require('../model/product.model');

class ProductServices {
    async addProduct (body) {
        return await Product.create({...body, productImage : body.imagePath});  
    };
    async findProduct (body) {
        // console.log('new====', body);
        return await Product.findOne(body);
    };
    async getAllProduct (body) {
        // console.log(body);
        return await Product.find({isDelete : false});
    }
    async updateProduct (id, body) {
        // console.log("Body===", body);
        return await Product.findByIdAndUpdate(id, {$set : body}, {new : true});
    };
};

module.exports = ProductServices;