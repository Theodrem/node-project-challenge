import { Controller, Route, Get, Post , SuccessResponse, Body } from 'tsoa';
import { UserService } from '../services/UserService';
import { IUser} from '../Type/AuthenticationType';

// @SuccessResponse("201", "Created") 
// @Route('user')
// export class UserController extends Controller {
//   @Post()
//   @Body() requestBody: I
//     public async goodOuser(): Promise<any>{
//     const request = emailAuthentication();

//   }

// }
