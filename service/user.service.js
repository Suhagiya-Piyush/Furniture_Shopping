const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const saltOrRounds = 10;

class UserServices {
    async addNewUser (body) {
        const hashPassword = bcrypt.hashSync(body.password,saltOrRounds)
        return await User.create({...body, password : hashPassword});
    };
    async findUser (body) {
        return await User.findOne(body);
    };
};

module.exports = UserServices;