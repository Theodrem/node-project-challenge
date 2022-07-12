import { sign, verify } from 'jsonwebtoken';
import { UserCreate, IUser } from '../Type/AuthenticationType';
import { IUserLogged } from '../Type/api/APIResponses';
import { ErrorCode } from '../Type/api/ErrorCode';

const config = require('../config/authConfig');

export function generateToken(body: UserCreate, secretConfig: string, expirationConfig: string): string {
  return sign({ body }, secretConfig, {
    expiresIn: expirationConfig,
  });
}

export async function generateTokens(authenticatedUser: IUser): Promise<IUserLogged> {
  const jwtToken: string = generateToken(authenticatedUser, config.secret, config.jwtExpiration);
  const refreshToken: string = generateToken(authenticatedUser, config.secret, config.jwtRefreshExpiration);
  const response: IUserLogged = {
    status: 'Success',
    statusCode: 200,
    token: jwtToken,
    refreshToken,
  };
  return response;
}

export function verifyToken(token: string, secret: string): IUser {
  try {
    const payload = verify(token, secret);
    return payload as IUser;
  } catch (err) {
    throw new Error('Authentication Failed');
  }
}

export async function generateAuthToken(refreshToken: string, config: string): Promise<IUserLogged> {
  try {
    const connectedUser: IUser = verifyToken(refreshToken, config);
    return generateTokens(connectedUser);
  } catch (err) {
    const response: IUserLogged = {
      status: 'Authentication Failed',
      statusCode: ErrorCode.Unauthorized,
      token: '',
      refreshToken: '',
    };
    return response;
  }
}
