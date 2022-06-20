import Jwt, { JwtPayload } from 'jsonwebtoken'
const config = require('../config/authConfig')
import { IUser, IUserCreate } from '../Type/AuthenticationType'

export function generateTokenFromUser(body: IUserCreate): string {
  return Jwt.sign({ body }, config.secret, {
    expiresIn: config.jwtExpiration
  })
}
