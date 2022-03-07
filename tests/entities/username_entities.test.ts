import {Username} from '../../src/entities/User/Username'

describe('Entity Username tests', () => {
    it('Should return Entity Username when Username is valid', async () => {
        const paramUsername = 'senha_teste'
        
        const username = Username.create(paramUsername)
        if(username instanceof Error)
            return
        expect(username).toBeInstanceOf(Username)
        expect(username.username).toBe(paramUsername)
    })
    it('Should return Invalid Username Error when Username is not valid', async () => {
        const paramUsername = 'senha teste'
        
        const username = Username.create(paramUsername)
        if(username instanceof Username)
            return
        expect(username).toBeInstanceOf(Error)
        expect(username.message).toBe('Invalid Username.')
    })
})