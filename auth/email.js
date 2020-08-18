const nodemailer = require('nodemailer');
const config = require('config');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.get('GMAIL_ID'), // generated ethereal user
    pass: config.get('GMAIL_PASS'), // generated ethereal password
  },
});

module.exports = function (token, email) {
  const url = `https://www.petrescyou.in/confirmation/t/${token}`;
  transporter.sendMail({
    to: email,
    subject: 'Email verification : for www.petrescyou.in',
    html: `
          This is only to verify that the email address belongs to you as it will be used for password reset and other user operations.
          <br/>
          Please click this link to confirm your email:
          <br/>
          <a href="${url}">${url}</a>`,
  });
};
