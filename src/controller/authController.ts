import { Controller, Route, Get, Body, Exception, Post, Query } from "tsoa";
import { SendMailNode } from "../services/NodeMailerService";
import { LoginCreateUser } from "../Type/LoginCreateUser";

@Route("auth")
export class AuthController extends Controller {
  @Post()
  public async login(@Body() BodyRequest: LoginCreateUser): Promise<void> {
    const Jwt: string = "12334";
    await SendMailNode(BodyRequest, Jwt)
      .then((body: any) => console.log(body))
      .catch((err: any) => console.log(err));
  }
}
