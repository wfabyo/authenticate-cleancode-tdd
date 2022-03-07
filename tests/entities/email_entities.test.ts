import {Email} from '../../src/entities/User/Email'

describe('Entity Email tests', () => {
    it('Should return Entity Email when email is valid', async () => {
        const paramEmail = 'email@email.com'
        
        const email = Email.create(paramEmail)
        if(email instanceof Error)
            return
        expect(email).toBeInstanceOf(Email)
        expect(email.email).toBe(paramEmail)
    })
    it('Should return Invalid Email Error when email is not valid', async () => {
        const paramEmail = 'email@email.com.com.com.com'
        
        const email = Email.create(paramEmail)
        if(email instanceof Email)
            return
        expect(email).toBeInstanceOf(Error)
        expect(email.message).toBe('Invalid Email.')
    })
})