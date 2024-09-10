const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const saltOrRounds = 10;

class UserServices {
    async addNewUser (body) {
        // console.log(body);
        const hashPassword = bcrypt.hashSync(body.password, saltOrRounds)
        return await User.create({...body, password : hashPassword, profileImage : body.imagePath});
    };
    async findUser (body) {
        return await User.findOne(body);
    };
    async updateProfile (userId, body) {
        // console.log('Body======>', body);
        return await User.findByIdAndUpdate(userId, body, {new : true});
    }
    async deleteUser (user) {
        // console.log("Delete User", user);
        return await User.findByIdAndUpdate(user._id, {isDelete : true}, {new : true});
    }
};

module.exports = UserServices;