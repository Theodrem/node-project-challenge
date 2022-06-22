import { Controller, Route, Get, Body, Exception, Post, Query } from 'tsoa'
import { SendMailNode } from '../services/NodeMailerService'
import { UserService } from '../services/UserService'
import { LoginCreateUser } from '../Type/LoginCreateUser'
import { IUserCreate, IUser } from '../Type/AuthenticationType'
import { generateTokenFromUser } from '../services/Jwt'
import { SSH } from '../services/Ssh'
import { InstanceConnection } from '../Type/InstanceConnection'

@Route('auth')
export class AuthController extends Controller {
  userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  @Post()
  public async login(@Body() BodyRequest: LoginCreateUser): Promise<void> {
    let UserId: Number | undefined = await this.userService.getUserByEMail(BodyRequest.email)
    let User: IUserCreate = { email: BodyRequest.email, firstName: '', lastName: '' }
    if (!UserId) {
      User = await this.userService.createUser(User)
    }
    await SendMailNode(BodyRequest.email, generateTokenFromUser(User))
  }

  @Post('instance')
  public async instanceConnection(@Body() body: InstanceConnection) {
    SSH.getSshConnection(body.host, body.username)
  }
}
