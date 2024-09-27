const User = require('../model/user.model');

class ForgetServices {
    async getUser (body){
        return await User.findOne(body);
    }
};

module.exports = ForgetServices;