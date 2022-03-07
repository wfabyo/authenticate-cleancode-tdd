import { User } from "../../../entities/User/User";
import { CreateUserRepository } from "../../../usecases/ports/repository/CreateUserRepository";
import { GetUserByLoginAndPasswordRepository } from "../../../usecases/ports/repository/GetUserByLoginAndPasswordRepository";
import { UserExistsRepository } from "../../../usecases/ports/repository/UserExistsRepository";
import { UserModel } from "./UserData";

export class UserRepository implements GetUserByLoginAndPasswordRepository, CreateUserRepository, UserExistsRepository {
    async userExists(username: string): Promise<User | null> {
        const userData = await UserModel.findOne({username: username}).exec()
        if(userData instanceof User) {
            return userData
        }
        return null
    }
    async createUser(login: string, password: string, email: string, name: string): Promise<User | Error> {
        const userData = await UserModel.create({id: 1, username: login, password: password, email: email, name: name})
        const user = User.create(userData.username, userData.password, userData.email, userData.name);
        if(user instanceof Error) 
            return user
        return user
    }

    async getUserByLoginAndPassword (login: string, password: string): Promise<User | Error> {
        const userData = await UserModel.findOne({username: login, password: password}).exec()
        if (userData === null) {
            return new Error('User not found.')
        }
        const user = User.create(userData.username, userData.password, userData.email, userData.name);
        if(user instanceof Error) 
            return user
        return user
    }
}