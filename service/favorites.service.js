const Favorites = require('../model/favorites.model');

class FavoritesServices {
    async addFavorites (body) {
          return await Favorites.create(body);
    };
    async findFavorites (query) {
        // console.log(query);
        return await Favorites.findOne(query);
    };
    async getAllFavorite (body) {
        // console.log(body);
        return await Favorites.find(body);
    }
    async deleteFavorite (id) {
        return await Favorites.findByIdAndUpdate(id , {$set : {isDelete : true}} , {new : true});
    };
};

module.exports = FavoritesServices;