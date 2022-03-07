export interface Hasher {
    crypt (plainText: string) : string
    decrypt (hashedText: string, plainText: string) : Promise<boolean>
}