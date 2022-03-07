import { Hasher } from "../../usecases/ports/helpers/Hasher";
import bcrypt from 'bcryptjs'

export class BcryptHasher implements Hasher {
    crypt(plainText: string): string {
        return bcrypt.hashSync(plainText);
    }
    async decrypt(hashedText: string, plainText: string): Promise<boolean> {
        return bcrypt.compare(plainText, hashedText)
    }
    
}