const express = require("express");
const FavoritesRoutes = express.Router();
const {
  addFavorites,
  getFavorite,
  deleteFavorite
} = require("../controller/favorites.controller");
const { verifyToken } = require("../helpers/verifyToken");

FavoritesRoutes.post("/", verifyToken, addFavorites);
FavoritesRoutes.get("/", verifyToken, getFavorite);
FavoritesRoutes.put("/deleteFav", verifyToken, deleteFavorite);

module.exports = FavoritesRoutes;
