const nodemailer = require("nodemailer")

const transporter=  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "6281ed4104413d",
      pass: "7b519dc3879e97",
    },
  });
  module.exports = transporter