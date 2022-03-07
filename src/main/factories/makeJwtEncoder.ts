import { JwtEncoder } from "../../adapters/helpers/JwtEncoder"
import { Encoder } from "../../usecases/ports/helpers/Encoder"

export const makeJwtEncoder = ():Encoder => {
    return new JwtEncoder()
}