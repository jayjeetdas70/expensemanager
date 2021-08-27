const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  CreateNewTransport() {
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_EMAIL_HOST,
      port: process.env.MAILTRAP_EMAIL_PORT,
      auth: {
        user: process.env.MAILTRAP_EMAIL_USERNAME,
        pass: process.env.MAILTRAP_EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async sendMail(subject) {
    const mailOptions = {
      to: this.to,
      from: this.from,
      subject: subject,
      text: `We heard that you lost your City Express password. Sorry about that!But don’t worry! You can use the following link to reset your password:
      ${this.url}`,
    };
    if (process.env.NODE_ENV === "development") {
      // Send by mailgun
      // this.CreateNewTransport();
      // await this.CreateNewTransport().sendMail(mailOptions);
      await sgMail.send(mailOptions);
    }
  }

  async sendResetEmail() {
    await this.sendMail("Your password reset token(Valid for 15 minutes)");
  }
};
//   async sendWelcome() {
//     await this.send("Welcome to the Natours Family!");
//   }

//  async sendPasswordReset() {
//     await this.send("Your password reset token (valid for only 10 minutes)");
// }
// };
