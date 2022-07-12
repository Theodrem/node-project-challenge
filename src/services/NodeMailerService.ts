import Nodemailer from 'nodemailer';
import { IUser, UserCreate } from '../Type/AuthenticationType';
import { generateToken } from './Jwt';
import { UserService } from './UserService';

export async function generateMail(email: string): Promise<void> {
  const userService = new UserService()
  let existingUser: IUser | undefined = await userService.getUserByEmail(email)
  let user: UserCreate = { email: email, firstName: '', lastName: '' }

function generateLoginUrl(Jwt: string): string {
  return process.env.REDIRECT_LOGIN_URL + Jwt;
}

export async function sendMailNode(Email: string, Jwt: string): Promise<void> {
  // create reusable transporter object using the default SMTP transport
  const transporter = Nodemailer.createTransport({
    service: process.env.SENDER_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: Email, // list of receivers
    subject: 'Connecte toi sur ta challenge', // Subject line
    text: 'Voici ton URL de connexion à la challenge  : Connecte toi !', // plain text body
    html: `Voici ton URL de connexion à la challenge : <a href='${generateLoginUrl(Jwt)}'>Connecte toi !</a>`, // html body
  });
}

export async function generateMail(email: string): Promise<void> {
  const userService = new UserService();
  const existingUser: IUser = await userService.getUserByEmail(email);
  let user: UserCreate = { email, firstName: '', lastName: '' };

  if (existingUser) {
    user = { ...existingUser };
  }
  user = await userService.createUser(user);

  await sendMailNode(email, generateToken(user, config.secretLogin, config.jwtLoginExpiration));
}
