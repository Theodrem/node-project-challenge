import { Controller, Route, Get, Body, Exception, Post, Query } from "tsoa";
import { SendMailNode } from "../services/NodeMailerService";
import { LoginCreateUser } from "../Type/LoginCreateUser";

@Route("login")
export class LoginController extends Controller {
  @Post("")
  async login(@Body() BodyRequest: LoginCreateUser): Promise<void> {
    await SendMailNode()
      .then((body: any) => console.log(body))
      .catch((err: any) => console.log(err));
  }

  @Post("loginLink")
  async loginLink(@Query("jwt") jwt: string): Promise<void> {}
}
