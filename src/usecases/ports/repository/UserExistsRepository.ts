import { User } from "../../../entities/User/User";

export interface UserExistsRepository {
    userExists(username: string): Promise<User | Error | null>
}