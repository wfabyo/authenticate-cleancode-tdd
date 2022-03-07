import { Email } from '../../src/entities/User/Email'
import { Name } from '../../src/entities/User/Name'
import { Password } from '../../src/entities/User/Password'
import {User} from '../../src/entities/User/User'
import { Username } from '../../src/entities/User/Username'

describe('Entity User tests', () => {
    it('Should return Entity User when User is valid', async () => {
        const username = 'username'
        const password = 'senha_valida'
        const email = 'email@email.com'
        const name = 'name lastname'

        const user = User.create(username, password, email, name)
        if(user instanceof Error)
            return
        expect(user).toBeInstanceOf(User)
        expect(user.username.username).toBe(username)
    })
    it('Should return Invalid User Error when Username is not valid', async () => {
        const username = 'username invalid'
        const password = 'senha_valida'
        const email = 'email@email.com'
        const name = 'name lastname'

        const user = User.create(username, password, email, name)
        if(user instanceof User)
            return
        expect(user).toBeInstanceOf(Error)
        expect(user.message).toBe('Invalid Username.')
    })
    it('Should return Invalid User Error when Password is not valid', async () => {
        const username = 'username'
        const password = 'password invalid'
        const email = 'email@email.com'
        const name = 'name lastname'

        const user = User.create(username, password, email, name)
        if(user instanceof User)
            return
        expect(user).toBeInstanceOf(Error)
        expect(user.message).toBe('Invalid Password.')
    })
    it('Should return Invalid User Error when Email is not valid', async () => {
        const username = 'username'
        const password = 'senha_valida'
        const email = 'emailinvalidemail.com'
        const name = 'name lastname'

        const user = User.create(username, password, email, name)
        if(user instanceof User)
            return
        expect(user).toBeInstanceOf(Error)
        expect(user.message).toBe('Invalid Email.')
    })
    it('Should return Invalid User Error when Name is not valid', async () => {
        const username = 'username'
        const password = 'senha_valida'
        const email = 'email@email.com'
        const name = 'namelastname'

        const user = User.create(username, password, email, name)
        if(user instanceof User)
            return
        expect(user).toBeInstanceOf(Error)
        expect(user.message).toBe('Invalid Name.')
    })
})