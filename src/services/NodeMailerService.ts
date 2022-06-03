import Nodemailer from "nodemailer";
import { Exception } from "tsoa";
import { LoginCreateUser } from "../Type/LoginCreateUser";

export async function SendMailNode() {
  // create reusable transporter object using the default SMTP transport
  let transporter = Nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "louis.78100@hotmail.fr",
      pass: "Zawadka78",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "louis.78100@hotmail.fr", // sender address
    to: "louis.78100@hotmail.fr", // list of receivers
    subject: "Hello ✔ hehe", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", Nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
