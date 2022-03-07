import { AuthenticateByUserAndPassword } from "../../usecases/Authenticate/AuthenticateByUserAndPassword"
import { Authenticate } from "../../usecases/ports/Authenticate"
import { makeJwtEncoder } from "./makeJwtEncoder"
import { makeUserRepository } from "./makeUserRepository"

export const makeAuthenticateUseCase = (): Authenticate => {
    return new AuthenticateByUserAndPassword(makeUserRepository(), makeJwtEncoder())
}