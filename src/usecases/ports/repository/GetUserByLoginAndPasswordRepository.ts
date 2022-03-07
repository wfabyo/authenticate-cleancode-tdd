import { User } from "../../../entities/User/User";

export interface GetUserByLoginAndPasswordRepository {
    getUserByLoginAndPassword(login: string, password: string): Promise<User|Error>
}