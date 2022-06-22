import { Controller, Route, Body, Post, Header, Response, Request } from 'tsoa'
import { UserService } from '../services/UserService'
import { LoginCreateUser } from '../Type/LoginCreateUser'
import { generateAuthToken } from '../services/Jwt'
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
  public async login(@Header('Authorization') loginToken: string, @Request() res: any): Promise<void> {
    const tokens = await generateAuthToken(loginToken.slice(7), config.secretLogin)
    this.setHeader('Set-Cookie', [`token=${tokens.token}; HttpOnly`, `refreshToken=${tokens.refreshToken}; HttpOnly`])
  }

  @Post('/refreshToken')
  public async refreshToken(@Header('Authorization') refreshingToken: string): Promise<void> {
    const tokens = await generateAuthToken(refreshingToken.slice(7), config.secret)
    this.setHeader('Set-Cookie', [`token=${tokens.token}; HttpOnly`, `refreshToken=${tokens.refreshToken}; HttpOnly`])
  }
}
