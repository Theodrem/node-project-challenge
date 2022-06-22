import Nodemailer from 'nodemailer'
import { IUser, IUserCreate } from '../Type/AuthenticationType'
import { generateToken } from './Jwt'
import { UserService } from './UserService'
const config = require('../config/authConfig')

export async function generateMail(email: string): Promise<void> {
  const userService = new UserService()
  let existingUser: IUser | undefined = await userService.getUserByEMail(email)
  let user: IUserCreate = { email: email, firstName: '', lastName: '' }

  existingUser ? user = { ...existingUser } : await userService.createUser(user)
  
  await sendMailNode(email, generateToken(user, config.secretLogin, config.jwtLoginExpiration))
}

export async function sendMailNode(Email: string, Jwt: string): Promise<void> {
  // create reusable transporter object using the default SMTP transport
  let transporter = Nodemailer.createTransport({
    service: process.env.SENDER_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    }
  })

  //send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: Email, // list of receivers
    subject: 'Connecte toi sur ta challenge', // Subject line
    text: 'Voici ton URL de connexion à la challenge  : Connecte toi !', // plain text body
    html: `Voici ton URL de connexion à la challenge : <a href='${GenerateLoginUrl(Jwt)}'>Connecte toi !</a>` // html body
  })
}

function GenerateLoginUrl(Jwt: string): string {
  return process.env.REDIRECT_LOGIN_URL + Jwt
}
