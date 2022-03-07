import {Password} from '../../src/entities/User/Password'

describe('Entity Password tests', () => {
    it('Should return Entity Password when Password is valid', async () => {
        const paramPassword = 'senha_teste'
        
        const password = Password.create(paramPassword)
        if(password instanceof Error)
            return
        expect(password).toBeInstanceOf(Password)
        expect(password.password).toBe(paramPassword)
    })
    it('Should return Invalid Password Error when Password is not valid', async () => {
        const paramPassword = 'senha teste'
        
        const password = Password.create(paramPassword)
        if(password instanceof Password)
            return
        expect(password).toBeInstanceOf(Error)
        expect(password.message).toBe('Invalid Password.')
    })
})