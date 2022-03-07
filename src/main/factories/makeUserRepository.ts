import { UserRepository } from "../../adapters/repositories/user-repositories/UserRepository";

export const makeUserRepository = (): UserRepository => {
    return new UserRepository();
}