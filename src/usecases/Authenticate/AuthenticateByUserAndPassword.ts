/* eslint @typescript-eslint/no-var-requires: "off" */
import { User } from "../../entities/User/User"
import { Authenticate } from "../ports/Authenticate";
import { Encoder } from "../ports/helpers/Encoder";
import { GetUserByLoginAndPasswordRepository } from "../ports/repository/GetUserByLoginAndPasswordRepository";

export class AuthenticateByUserAndPassword implements Authenticate {

    constructor(private readonly getUserByLoginAndPasswordRepository: GetUserByLoginAndPasswordRepository, private readonly encoder: Encoder) {}

    async process(login: string, password: string): Promise<string|Error> {
        const user: User | Error = await this.getUserByLoginAndPasswordRepository.getUserByLoginAndPassword(login, password)
        
        if (user instanceof Error) {
            return user;
        }

        const token = this.encoder.encode({user})  
        return token
    }
}