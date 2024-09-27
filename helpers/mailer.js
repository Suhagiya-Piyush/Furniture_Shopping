const nodemailer = require('nodemailer');

// Environment variable usage for better security
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_USER || 'piyush.suhagiya.ps@gmail.com', // Use env variable
    pass: process.env.MAIL_PASSWORD || 'cnyrguhbwtkouhau', // Use env variable
  },
});

// Exporting sendMail function
exports.sendMail = async (body) => {
  try {
    if (!body.mailto || !body.OTP) {
      throw new Error("Missing 'mailto' or 'OTP' in request body");
    }
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER, // sender address
      to: body.mailto, // list of receivers
      subject: "Forget Password OTP", // Subject line
      text: `Your OTP is: ${body.OTP}`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error occurred while sending mail:", error);
    return { success: false, error: error.message };
  }
};
