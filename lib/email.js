const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate;
const emailTemplate = path.join(__dirname, '..', 'templates', 'email');
const Promise = require('bluebird');

const sentMails = {};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eshopperga@gmail.com',
    pass: process.env.ESHOPPER_PASSWORD
  }
});


function sendEmail(receiver) {

  // check if an email has been sent in the last hour to this user
  if((new Date()).getTime() < sentMails[receiver.id]) return false;

  const email = new EmailTemplate(emailTemplate);
  console.log(receiver.email);

  return new Promise((resolve, reject) => {
    email.render({ receiver }, (err, result) => {
      if (err) reject(err);

      transporter.sendMail({
        from: '"eShopper" <eshopperga@gmail.com>',
        to: receiver.email,
        subject: `${receiver.username}, you have a message!`,
        html: result.html,
        text: result.text
      }, (err) => {
        if (err) reject(err);

        sentMails[receiver.id] = (new Date()).getTime() + 1000 * 60 * 60;
        return resolve();
      });

    });
  });
}

module.exports = {
  send: sendEmail
};
