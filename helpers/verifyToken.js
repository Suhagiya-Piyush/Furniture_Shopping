const jwt = require('jsonwebtoken');
const UserServices = require('../service/user.service');
const UserService = new UserServices();

exports.verifyToken = async (req, res, next) => {
    try {
        const authToken = req.headers['authorization'];
        // console.log("authToken", authToken);
        if(!authToken) return res.status(401).json({ message : 'Unauthorised...'});
        const token = authToken.split(' ')[1];
        // console.log(token);
        const payload = await jwt.verify(token, process.env.JWT_SEC_KEY);
        // console.log(payload);
        const user = await UserService.findUser({_id : payload.userId , isDelete : false});
        // console.log("User", user);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server Error...' });
    }
};