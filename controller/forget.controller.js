const ForgetServices = require('../service/forget.service');
const ForgetService = new ForgetServices();
const mailer = require('../helpers/mailer');

exports.forgetPassword = async (req, res) => {
    try {
        const user = await ForgetService.getUser({ email : req.body.email});
        // console.log("User ===> ", user);
        if(!user) return res.json({message : 'User not Found...'});
        const OTP = Math.floor(Math.random() * 9999);
        // console.log(OTP);
        const mailRespons = await mailer.sendMail({mailto : user.email , OTP : OTP });
        if(!mailRespons.success){
            return res.status(400).json(mailRespons)
        }
        return res.status(200).json(mailRespons)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Internal Server error...' });
    }
};