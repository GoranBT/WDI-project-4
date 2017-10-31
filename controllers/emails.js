const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate;
const emailTemplate = path.join(__dirname, '..', 'templates', 'email');
const { url } = require('../config/environment');
const locals = { url };
const Promise = require('bluebird');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eshopperga@gmail.com',
    pass: process.env.ESHOPPER_PASSWORD
  }
});

// function findConversation(req, res, next) {
//   console.log(req);
//   Conversation
//     .findById(req.params.id)
//     .populate('receiver')
//     .exec()
//     .then(conversation => {
//       if(!conversation) return res.notFound();
//       locals.conversation = conversation;
//
//       sendEmail();
//       return res.end();
//     })
//     .catch(next);
// }



function sendEmail(receiver, message) {
  const email = new EmailTemplate(emailTemplate);

  locals.receiver = receiver;
  locals.message = message;

  return new Promise((resolve, reject) => {
    email.render(locals, (err, result) => {
      if (err) reject(err);

      transporter.sendMail({
        from: '"eShopper" <eshopperga@gmail.com>',
        to: receiver.email,
        subject: `${locals.receiver.name}, you have a message!`,
        html: result.html,
        text: result.text
      }, (err) => {
        if (err) reject(err);
        return resolve();
      });

    });
  });
}

module.exports = {
  send: sendEmail
};
