const express = require("express");
const userRoutes = express.Router();
const {
  registerNewUser,
  loginUser,
  updateProfile,
  changePassword,
  deleteUser
} = require("../controller/user.controller");
const { verifyToken } = require("../helpers/verifyToken");
const { upload } = require('../helpers/imageUplode');

userRoutes.post("/", upload.single("profileImage"), registerNewUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/", verifyToken, (req, res) =>
  res.status(200).json({ user: req.user })
);
userRoutes.post("/update-profile", verifyToken, updateProfile);
userRoutes.post("/update-password", verifyToken, changePassword);
userRoutes.post("/delete-user", verifyToken, deleteUser);

module.exports = userRoutes;
