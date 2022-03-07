import { Authenticate } from "../../usecases/ports/Authenticate";
import { Controller } from "../ports/Controller";
import { badRequest, HttpRequest, ok } from "../helpers/http-helpers";

export class AuthenticateController implements Controller {
     
    constructor(private readonly authenticate: Authenticate){}

    public async handle (request: HttpRequest) {
        try {
            if (!request.body.login || !request.body.password){
                return badRequest(new Error('Missing Parameters'))
            }
            const params = {username: request.body.login, password: request.body.password}
            const token = await this.authenticate.process(params.username, params.password)
            if(token instanceof Error) 
                return badRequest(token)
            return ok({token: token});
        } catch (err) {
            return badRequest(new Error('Internal Error'))
        }
    }
}
