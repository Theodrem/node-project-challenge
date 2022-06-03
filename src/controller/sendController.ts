import { Controller, Route, Get, Body, Exception, Post } from "tsoa";
import { SendMailNode } from "../services/NodeMailerService";

@Route("sendMail")
export class SendController extends Controller {
  @Post("")
  async login(): Promise<void> {
    await SendMailNode().catch(console.error);
  }
}
