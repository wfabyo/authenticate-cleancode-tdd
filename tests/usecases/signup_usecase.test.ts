import { User } from "../../src/entities/User/User";
import { Hasher } from "../../src/usecases/ports/helpers/Hasher";
import { CreateUserRepository } from "../../src/usecases/ports/repository/CreateUserRepository";
import { UserExistsRepository } from "../../src/usecases/ports/repository/UserExistsRepository";
import { SignupUser } from "../../src/usecases/Signup/SignupUser";

class CreateUserRepositoryMock implements CreateUserRepository {
    async createUser(login: string, password: string, email: string, name: string): Promise<User | Error> {
        return User.create(login, password, email, name);
    }
}

class UserExistsRepositoryMock implements UserExistsRepository {
    username = 'any_user'
    password = 'password'
    email = 'email@email.com'
    name = 'name lastname'

    async userExists(username: string): Promise<User | Error | null> {
        if(this.username == username) {
            const user =User.create(this.username, this.password, this.email, this.name);
            if(user instanceof Error)
                return user;
            return user
        }
        return null
    }
}

class EncrypterHasherMock implements Hasher {
    crypt_text = 'any_crypt_text'

    crypt(plainText: string): string {
        return this.crypt_text
    }
    async decrypt(hashedText: string, plainText: string): Promise<boolean> {
        return true
    }
    
}

function makeSignup() {
    const createUserRepositoryMock = new CreateUserRepositoryMock();
    const userExistsRepository = new UserExistsRepositoryMock();
    const hasher = new EncrypterHasherMock();
    const signup = new SignupUser(createUserRepositoryMock, userExistsRepository, hasher);
    return {signup, createUserRepositoryMock, userExistsRepository, hasher}
}

describe('Signup tests', () => {
    it('Should return a inserted User', async () => {
        const username = 'user_test';
        const password = 'password';
        const email = 'email@email.com';
        const name = 'name lastname';
        
        const {signup, createUserRepositoryMock, userExistsRepository, hasher} = makeSignup();
        const createUserMock = jest.spyOn(createUserRepositoryMock, 'createUser');
        const userExistsMock = jest.spyOn(userExistsRepository, 'userExists');
        const hasherMock = jest.spyOn(hasher, 'crypt');
        
        const user = await signup.process(username, password, email, name);

        expect(user).toBeInstanceOf(User);
        expect(createUserMock).toBeCalledWith(username, hasher.crypt(password), email, name);
        expect(userExistsMock).toBeCalledWith(username);
        expect(hasherMock).toBeCalledWith(password);
    })
    
    it('Shoud return Error when the user couldnt be created', async () => {
        const username = 'any_test';
        const password = '';
        const email = 'email@email.com';
        const name = 'name lastname';
        const {signup, createUserRepositoryMock} = makeSignup();
        jest.spyOn(createUserRepositoryMock, 'createUser').mockImplementation(async()=>{
            return new Error('Invalid Password.');
        })
        
        const error = await signup.process(username, password, email, name)
        
        expect(error).toBeInstanceOf(Error)
    })

    it('Shoud return Error when the user not found in repository', async () => {
        const {signup, createUserRepositoryMock} = makeSignup();
        jest.spyOn(createUserRepositoryMock, 'createUser').mockImplementation(async() => {
            return new Error('User not found');
        });
        const username = 'any_test'
        const password = ''
        const email = 'email@email.com'
        const name = 'name lastname'

        const error = await signup.process(username, password, email, name)
        
        expect(error).toBeInstanceOf(Error)
    })

    it('Shoud return Error when the user already exists in repository', async () => {
        const username = 'any_test';
        const password = 'any_password';
        const email = 'email@email.com';
        const name = 'name lastname';
        
        const {signup, userExistsRepository} = makeSignup();
        jest.spyOn(userExistsRepository, 'userExists').mockImplementation(async() => {
            return User.create(username, password, email, name);
        });
        
        const error = await signup.process(username, password, email, name)
        
        expect(error).toBeInstanceOf(Error)
    })
})