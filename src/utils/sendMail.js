const nodemailer = require('nodemailer');
const MAIL_PSWRD = process.env.MAIL_PSWRD;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

function SendMailOnResetPassword(getUser, token) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_ADDRESS,
      pass: MAIL_PSWRD,
    },
    secure: true,
  });

  const mailData = {
    from: EMAIL_ADDRESS,
    to: getUser.email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: `<h1>Hi ${getUser.firstname}</h1><br><h2>Click on the link below to reset your password</h2><br><a href="http://localhost:3000/reset-password?token=${token}">Click here</a>`
  }
  // 👆 on front on the route http://localhost:3000/reset-password?token=VALUEOFTHETOKEN get the query params value and send it to the backend to the patch route with the new password 

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

function SendMailToShopOwnerOnOrder(order) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_ADDRESS,
      pass: MAIL_PSWRD,
    },
    secure: true,
  });

  const mailData = {
    from: EMAIL_ADDRESS,
    to: "omanga.acc@gmail.com",
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: `<h1>Hi</h1><br><h2>A new order has been received ! Here are the details</h2><br><p>userId: ${order.user_id}</p><br><p>productId: ${order.product_id}</p><br><p>quantity: ${order.product_quantity}</p><br><p>orderDate: ${order.order_date}</p>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

function SendMailToUserOnDeleteAccount(user) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_ADDRESS,
      pass: MAIL_PSWRD,
    },
    secure: true,
  });

  const mailData = {
    from: EMAIL_ADDRESS,
    to: user.email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: `<h1>Hi ${user.firstname}</h1><br><h2>Your account has been deleted</h2><br><p>Thank you for your visit</p>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports = {
  SendMailOnResetPassword,
  SendMailToShopOwnerOnOrder,
  SendMailToUserOnDeleteAccount
};
