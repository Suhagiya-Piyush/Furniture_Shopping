const nodemailer = require('nodemailer');

exports.sendMail = async (message) =>{
    const transporter = nodemailer.createTransport({
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      let info = await transporter.sendMail(message);
      console.log("Mail Sent Success.... ", info.response);
}



/*

    1.Write an API for Send OTP => body email enter => OTP generate & Send Mail with OTP also OTP Store in User model & generate Token

    2.Write an API for verify OTP => Authorization => body OTP and user OTP mathched => 
*/