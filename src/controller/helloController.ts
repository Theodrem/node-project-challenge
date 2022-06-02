import { Controller, Route, Get } from "tsoa";

@Route('hello')
export class HelloController extends Controller {

    @Get('')
    public goodOldHello(): string {
        return "Hello World"
    }
}


