import { AuthenticateController } from "../../adapters/controllers/AuthenticateController"
import { Controller } from "../../adapters/ports/Controller"
import { makeAuthenticateUseCase } from "./makeAuthenticateUseCase"

export const makeAuthenticateController = (): Controller => {
    return new AuthenticateController(makeAuthenticateUseCase())
 }