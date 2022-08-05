"use strict";
const nodemailer = require("nodemailer");

async function main(user) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user,
      pass: testAccount.pass, 
    },
  });

  let info = await transporter.sendMail({
    from: '"Lukic Dejan" <.shop@example.com>', 
    to: user.email, 
    subject: "Acivate account", 
    html: `
    <h1>Activate account</h1>
    <p>Dear, ${user.username}</p>
    <p>Please click on link bellow to activate your account</p>
    <a href="http://localhost:3000/user-activate/${user._id.toString()}" target="_blank">Activate link</a>
    `,
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}

module.exports = main;