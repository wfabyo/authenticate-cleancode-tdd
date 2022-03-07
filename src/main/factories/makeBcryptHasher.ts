import { BcryptHasher } from "../../adapters/helpers/BcryptHasher";

export const makeBcryptHasher = () : BcryptHasher => {
    return new BcryptHasher()
}