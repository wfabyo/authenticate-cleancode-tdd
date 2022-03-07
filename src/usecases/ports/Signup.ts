import { User } from "../../entities/User/User";

export interface Signup {
    process(login: string, password: string, email: string, name: string): Promise<User|Error> 
}