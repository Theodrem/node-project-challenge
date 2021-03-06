import { Controller, Route, Body, Post, Header } from 'tsoa'
import { UserService } from '../services/UserService'
import { LoginCreateUser } from '../Type/LoginCreateUser'
import { generateAuthToken } from '../services/Jwt'
import { IUserLogged } from '../Type/api/APIResponses'
import { generateMail } from '../services/NodeMailerService'
import { SSH } from '../services/Ssh'
import { InstanceConnection } from '../Type/InstanceConnection'
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
  public async login(@Header('auth-token') loginToken: string): Promise<IUserLogged> {
    const tokens: IUserLogged = await generateAuthToken(loginToken, config.secretLogin)
    this.setStatus(tokens.statusCode)
    return tokens
  }

  @Post('/refreshToken')
  public async refreshToken(@Header('auth-token') refreshingToken: string): Promise<IUserLogged> {
    const tokens: IUserLogged = await generateAuthToken(refreshingToken, config.secret)
    this.setStatus(tokens.statusCode)
    return tokens
  }

  @Post('instance')
  public async instanceConnection(@Body() body: InstanceConnection) {
    SSH.getSshConnection(body.host, body.username)
  }
}
