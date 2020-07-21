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

module.exports = transporter;
