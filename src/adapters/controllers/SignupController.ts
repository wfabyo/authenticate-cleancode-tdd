import { Signup } from "../../usecases/ports/Signup";
import { badRequest, HttpRequest, HttpResponse, ok } from "../helpers/http-helpers";
import { Controller } from "../ports/Controller";

export class SignupController implements Controller {
    constructor(private readonly signup: Signup){}
    
    public async handle (request: HttpRequest): Promise<HttpResponse>{
        try {
            if (!request.body.login || !request.body.password || !request.body.email || !request.body.name ){
                return badRequest(new Error('Missing Parameters'))
            }
            const params = {username: request.body.login, password: request.body.password, email: request.body.email, name: request.body.name}
            const user = await this.signup.process(params.username, params.password, params.email, params.name)
            if(user instanceof Error) 
                return badRequest(user)
            return ok({user: user});
        } catch (err) {
            return badRequest(new Error('Internal Error'))
        }
    }
    
}