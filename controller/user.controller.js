// const User = require('../model/user.model');
const UserServices = require('../service/user.service');
const UserService = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { token } = require('morgan');
// const filePath = path.join(__dirname)

exports.registerNewUser = async (req, res) => {
    try {
        let imagePath = '';
        console.log("body=====>",req.body);
        let user = await UserService.findUser({ email : req.body.email, isDelete : false});
        if(user){
            return res.json({ message : 'User Already Register...'});
        }
        if(req.file){
            imagePath = req.file.path.replace(/\\/g, '/');
            // console.log("ImgPath", imagePath);
        }
        user = await UserService.addNewUser({...req.body, imagePath});
        user.save();
        res.status(201).json({user, message : 'New User Registration Success...'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await UserService.findUser({ email : req.body.email, isDelete : false });
        if(!user) return res.status(404).json({ message : 'User not Found...'});
        const isMatch =  await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({ message : 'Email OR Password not Match...'});
        const token = jwt.sign({userId : user._id}, process.env.JWT_SEC_KEY);
        return res.status(200).json({ message : 'User Login Success...', token});
        // return res.status(200).header("auth-token", token).json({ "token": token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let user = req.user;
        // let change = req.body;
        // console.log(user);
        // console.log(change);
        user = await UserService.updateProfile(user._id, req.body);
        // console.log(user);
        res.status(202).json({message : 'User Updated Successfully...', user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        // let user = await req.user;
        let user = req.user;
        // console.log("Sahil ====>", user);
        let {currentPassword, newPassword, confirmPassword} = req.body;
        // console.log(body);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch) return res.status(404).json({ message : "Current Password isn't Match"});
        if(currentPassword === newPassword) return res.status(400).json({message: 'Your New Password is already used...'});
        if(newPassword !== confirmPassword) return res.status(400).json({message : "New Password and Confirm Password isn't Match"});
        let hashPassword= await bcrypt.hash(newPassword, 10);
        user = await UserService.updateProfile(user._id, { password: hashPassword });
        res.status(202).json({ message : 'Password Change Successfully...', user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // console.log(req.user);
        let user = await UserService.deleteUser(req.user);
        res.status(202).json({ message : 'User Deleted Success...', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};
