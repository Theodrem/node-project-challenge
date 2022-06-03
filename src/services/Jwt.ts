import Jwt, { JwtPayload } from 'jsonwebtoken';

const secretkey = 'secretkeyfromenv';

export function generateToken(): string {
  // @TODO: Need to set user data inside the token payload
  return Jwt.sign({}, secretkey);
}
