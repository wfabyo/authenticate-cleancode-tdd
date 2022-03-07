import { Signup } from "../../usecases/ports/Signup"
import { SignupUser } from "../../usecases/Signup/SignupUser"
import { makeBcryptHasher } from "./makeBcryptHasher"
import { makeUserRepository } from "./makeUserRepository"

export const makeSignupUseCase = (): Signup => {
    return new SignupUser(makeUserRepository(), makeUserRepository(), makeBcryptHasher())
}