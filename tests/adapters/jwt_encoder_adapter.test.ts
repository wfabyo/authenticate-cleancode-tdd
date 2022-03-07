import jwt from "jsonwebtoken";
import { JwtEncoder } from "../../src/adapters/helpers/JwtEncoder";

jest.mock('jsonwebtoken', () => ({
    sign() : string {
        return 'any_token';
    },
    verify() : string {
        return 'any_payload'
    }
}))

const secret = 'test';
const expiresIn = "600";
const makeSut = () => {
    return new JwtEncoder();
}

const throwError = (message: string) : never => {
    throw new Error(message)
}

describe('Encoder tests', () => {
    describe('Sign()', () => {
        it('Should call sign method when a valid payload was informed', () => {
            const sut = makeSut();
            const encoderSpy = jest.spyOn(jwt, 'sign')
            sut.encode('any_payload')
            expect(encoderSpy).toHaveBeenCalledWith({payload: 'any_payload'}, secret, {expiresIn: expiresIn})
        })
        it('Should return a token when sign runs with success', () => {
            const sut = makeSut()
            const token = sut.encode('any_payload')
            expect(token).toBe('any_token')
        })
    })

    describe('Verify()', () => {
        it('Should call verify method when a token was informed', () => {
            const sut = makeSut();
            const encoderSpy = jest.spyOn(jwt, 'verify')
            sut.verify('any_token')
            expect(encoderSpy).toHaveBeenCalledWith('any_token', secret)
        })
        it('Should return a payload when verify runs with success', () => {
            const sut = makeSut()
            const payload = sut.verify('any_token')
            expect(payload).toBe('any_payload')
        })
    })
})