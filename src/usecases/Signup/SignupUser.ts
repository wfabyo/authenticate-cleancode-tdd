import { User } from "../../entities/User/User";
import { Hasher } from "../ports/helpers/Hasher";
import { CreateUserRepository } from "../ports/repository/CreateUserRepository";
import { UserExistsRepository } from "../ports/repository/UserExistsRepository";
import { Signup } from "../ports/Signup";

export class SignupUser implements Signup {

    constructor(private readonly createUserRepository: CreateUserRepository, private readonly userExistsRepository: UserExistsRepository, private readonly hasher: Hasher) {}

    async process(login: string, password: string, email: string, name: string): Promise<User|Error> {
        const userData = await this.userExistsRepository.userExists(login)
        if (userData === null) {
            const hashedPassword = this.hasher.crypt(password)
            const user = await this.createUserRepository.createUser(login, hashedPassword, email, name)
            if (user instanceof Error) {
                return user;
            }
            return user
        } else {
            return new Error('Username already exists.')
        }
    }
}