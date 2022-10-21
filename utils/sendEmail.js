const sendgridMail = require("@sendgrid/mail");
require("dotenv").config();

function sendEmail({ to, subject, html }) {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  sendgridMail.send({
    from: "fannetta21@gmail.com",
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
