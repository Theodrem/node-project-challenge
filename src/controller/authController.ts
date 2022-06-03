import { Controller, Route, Get, Post , SuccessResponse, Body } from 'tsoa';
import { UserService } from '../services/UserService';
import { UserCreationParams } from '../Type/AuthenticationType';


@Route('user')
export class UserController extends Controller {

  @Post()
  @SuccessResponse("201", "Created")
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
     // set return status 201
    const request = new UserService().createUser(requestBody);
    return this.setStatus(201);
  }
}

