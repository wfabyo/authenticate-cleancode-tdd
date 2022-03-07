import { SignupController } from "../../adapters/controllers/SignupController"
import { Controller } from "../../adapters/ports/Controller"
import { makeSignupUseCase } from "./makeSignupUseCase"

export const makeSignupController = (): Controller => {
    return new SignupController(makeSignupUseCase())
 }