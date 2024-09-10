const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    sku : {
        type : String,
        required : true,
        unique : true
    },
    productTitle : {
        type : String,
        required : true
    },
    color : {
        type : String
    },
    productImage : {
        type : String
    },
    productPrice : {
        type : Number,
        required : true
    },
    disc : {
        type : String,
        required : true
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

module.exports = mongoose.model('products', productSchema);