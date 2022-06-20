import { Controller, Route, Get, Post , SuccessResponse, Body, Path, Put, Delete, Security } from 'tsoa';
import { UserService } from '../services/UserService';
import { ICreateResponse, IUpdateResponse } from '../Type/api/APIResponses';
import { IUserCreate, IUserUpdate } from '../Type/AuthenticationType';
import { IUser } from '../Type/AuthenticationType';


@Route('user')
@Security('jwt')
export class UserController extends Controller {
  userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  /**
   * Get All Users
   */
  @Get()
  public async getAll(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  /**
   * Get a single user passing the user email
   */
  @Get('{email}')
  public async getUserByEMail(@Path() email: string): Promise<IUser> {
    return this.userService.getUserByEMail(email);
  }

  /**
   * Get a single user passing the user ID
   */
  // @Get('{id}')
  // public async getUser(@Path() id: number): Promise<IUser> {
  //   return this.userService.getUser(id);
  // }

  /**
   * Create a new user
   */
  @Post()
  @SuccessResponse('201', 'Created')
  public async createUser(@Body() requestBody: IUserCreate): Promise<ICreateResponse> {
    // set return status 201
    this.setStatus(201);
    return this.userService.createUser(requestBody);
  }

  /**
   * Update a user by passing the user ID in the query
   */
  @Put('{id}')
  public async updateUser(@Path() id: number, @Body() body: IUserUpdate): Promise<IUpdateResponse> {
    return this.userService.updateUser(body, id);
  }

  /**
   * Delete a user
   */
  @Delete('{id}')
  public async deleteUser(@Path() id: number): Promise<IUpdateResponse> {
    return this.userService.deleteUser(id);
  }
}

