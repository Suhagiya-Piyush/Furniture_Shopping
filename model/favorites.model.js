const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    isDelete:{
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

module.exports = mongoose.model('favorites', favoritesSchema);