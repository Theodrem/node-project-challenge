import { sign, verify } from 'jsonwebtoken'
import { IUserCreate, IUser } from '../types/AuthenticationType'
import { IUserLogged } from '../types/api/APIResponses'
import { ErrorCode } from '../types/api/ErrorCode'

const authConfig = require('../config/authConfig')

export function generateToken(
  body: IUserCreate,
  secretConfig: string,
  expirationConfig: string
): string {
  return sign({ body }, secretConfig, {
    expiresIn: expirationConfig
  })
}

export function verifyToken(token: string, secret: string): IUser {
  try {
    const payload = verify(token, secret)
    return payload as IUser
  } catch (err) {
    throw new Error('Authentication Failed')
  }
}

export async function generateTokens(authenticatedUser: IUser): Promise<IUserLogged> {
  const jwtToken: string = generateToken(
    authenticatedUser,
    authConfig.secret,
    authConfig.jwtExpiration
  )
  const refreshToken: string = generateToken(
    authenticatedUser,
    authConfig.secret,
    authConfig.jwtRefreshExpiration
  )
  const response: IUserLogged = {
    status: 'Success',
    statusCode: 200,
    token: jwtToken,
    refreshToken
  }
  return response
}

export async function generateAuthToken(
  refreshToken: string,
  config: string
): Promise<IUserLogged> {
  try {
    const connectedUser: IUser = verifyToken(refreshToken, config)
    return generateTokens(connectedUser)
  } catch (err) {
    const response: IUserLogged = {
      status: 'Authentication Failed',
      statusCode: ErrorCode.Unauthorized,
      token: '',
      refreshToken: ''
    }
    return response
  }
}
