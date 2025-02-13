const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'theousdevworks@gmail.com',
      pass: 'kmdrcvbwjxzkhybm',
    },
  });

  await transporter.sendMail({
    from: 'theousdevworks@gmail.com',
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
