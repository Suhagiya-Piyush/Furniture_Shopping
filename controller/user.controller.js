// const User = require('../model/user.model');
const UserServices = require('../service/user.service');
const UserService = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

exports.registerNewUser = async (req, res) => {
    try {
        // console.log("body=====>",req.body);
        let user = await UserService.findUser({ email : req.body.email, isDelete : false});
        if(user){
            return res.json({ message : 'User Already Register...'});
        }
        user = await UserService.addNewUser({...req.body});
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

};

exports.changePassword = async (req, res) => {

};

exports.deleteUser = async (req, res) => {

};
