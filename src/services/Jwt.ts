import Jwt, { JwtPayload } from 'jsonwebtoken';
const config = require('../../config/auth.config');
import { IUser } from '../Type/AuthenticationType';

export function generateTokenFromUser(body: IUser): string {
  return Jwt.sign(body, config.secret, {
    expiresIn: config.jwtExpiration
  });
}
