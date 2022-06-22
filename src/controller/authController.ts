import { Controller, Route, Get, Body, Exception, Post, Query, Header, Security } from 'tsoa'
import { UserService } from '../services/UserService'
import { LoginCreateUser } from '../Type/LoginCreateUser'
import { IUserCreate, IUser } from '../Type/AuthenticationType'
import { generateToken, generateAuthToken, verifyToken } from '../services/Jwt'
import { IUserLogged } from '../Type/api/APIResponses'
import { generateMail } from '../services/NodeMailerService'
const config = require('../config/authConfig')

@Route('auth')
export class AuthController extends Controller {
  userService: UserService
  constructor() {
    super()
    this.userService = new UserService()
  }

  @Post('/sendMail')
  public async sendMail(@Body() BodyRequest: LoginCreateUser): Promise<void> {
    generateMail(BodyRequest.email)
  }

  @Post('/login')
  public async login(@Header('Authorization') loginToken: string): Promise<IUserLogged> {
    return generateAuthToken(loginToken.slice(7), config.secretLogin)
  }

  @Post('/refreshToken')
  public async refreshToken(@Header('AuthorizationRefresh') refreshingToken: string): Promise<IUserLogged> {
    return generateAuthToken(refreshingToken, config.secret)
  }
}
