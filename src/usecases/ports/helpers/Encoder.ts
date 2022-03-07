export interface Encoder {
    encode (payload: any): string
    verify (token: string): any
}