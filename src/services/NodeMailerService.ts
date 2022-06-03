import Nodemailer from "nodemailer";

export async function SendMailNode(Email: string, Jwt: string) {
  // create reusable transporter object using the default SMTP transport
  let transporter = Nodemailer.createTransport({
    service: process.env.SENDER_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  //send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: Email, // list of receivers
    subject: "Connecte toi sur ta challenge", // Subject line
    text: "Voici ton URL de connexion  : " + GenerateLoginUrl(Jwt), // plain text body
    html: `<b>Voici ton URL de connexion  : ${GenerateLoginUrl(Jwt)} </b> `, // html body
  });
}

function GenerateLoginUrl(Jwt: string): string {
  return process.env.REDIRECT_LOGIN_URL + Jwt;
}
