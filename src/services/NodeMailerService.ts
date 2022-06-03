import Nodemailer from "nodemailer";

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
    text: "Voici ton URL de connexion  : " + CreateConnectionUrl(), // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", Nodemailer.getTestMessageUrl(info));
}

function CreateConnectionUrl(): string {
  console.log(process.env.REDIRECT_LOGIN_URL);
  return "";
}
