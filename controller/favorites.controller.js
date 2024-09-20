// const Favorites = require('../model/favorites.model');
const FavoritesServices = require("../service/favorites.service");
const FavoritesService = new FavoritesServices();

exports.addFavorites = async (req, res) => {
  try {
    // console.log('user',req.user);
    // console.log('product id' , req.query);
    let favorite = await FavoritesService.findFavorites({
      userId: req.user._id,
      productId: req.query.productId,
      isDelete: false
    });
    
    if (favorite) {
      return await res.json({ message: "Already Added in Favorite..." });
    }
    favorite = await FavoritesService.addFavorites({
      userId: req.user._id,
      productId: req.query.productId
    });
    res.status(201).json({ message: "Add to Favorite...", favorite });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error..." });
  }
};

exports.getFavorite = async (req, res) => {
  try {
    // console.log(req.user); { userId : req.user._id , isDelete : false}
    const favorite = await FavoritesService.getAllFavorite({
      userId: req.user._id,
      isDelete: false
    });
    res.status(202).json({ message: "My Favorite Products...", favorite });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error..." });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    // console.log(req.query);
    let favorite = await FavoritesService.findFavorites({_id : req.query.favId, userId : req.user._id, isDelete: false});
    if (!favorite) {
      return await res.json({ message: "Item Not Found..." });
    }
    favorite = await FavoritesService.deleteFavorite(favorite._id);
    res.status(200).json({ message : 'Remove to Favorite...', favorite})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error..." });
  }
};
