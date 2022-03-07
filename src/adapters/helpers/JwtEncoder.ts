import { Encoder } from "../../usecases/ports/helpers/Encoder";
import jwt from 'jsonwebtoken'
import { expiresIn, secret } from "../../main/env";

export class JwtEncoder implements Encoder {
    encode(payload: any): string {
        return jwt.sign({payload}, secret, { expiresIn: expiresIn})
    }
    verify(token: string) {
        return jwt.verify(token, secret)
    }
    
}