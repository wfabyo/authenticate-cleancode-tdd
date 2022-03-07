import { User } from "../../../entities/User/User";

export interface CreateUserRepository {
    createUser(login: string, password: string, email: string, name: string): Promise<User|Error>;
}