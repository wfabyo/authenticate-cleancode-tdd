import { GetUserByLoginAndPasswordRepository } from '../../src/usecases/ports/repository/GetUserByLoginAndPasswordRepository';
import { User } from '../../src/entities/User/User';
import { AuthenticateByUserAndPassword } from '../../src/usecases/Authenticate/AuthenticateByUserAndPassword';
import { Encoder } from '../../src/usecases/ports/helpers/Encoder';

class AuthenticateUserByLoginAndPasswordMock implements GetUserByLoginAndPasswordRepository {
    async getUserByLoginAndPassword(login: string, password: string): Promise<User|Error> {
         return (login === 'usuario' && password === 'senha_valida')?User.create(login, password, 'email@email.com', "name lastname"):Error('User not find')
    }
}

class EncoderMock implements Encoder {
    encode(payload: any): string {
        return 'any_token'
    }
    verify(token: string) {
        return 'any_token'
    }
}

function makeSut() : AuthenticateByUserAndPassword {
    const authenticateUserByLoginAndPasswordMock = new AuthenticateUserByLoginAndPasswordMock();
    const encoderMock = new EncoderMock();
    return new AuthenticateByUserAndPassword(authenticateUserByLoginAndPasswordMock, encoderMock);
}

describe('Authenticate', () => {
    it('it should return a token validation when exist user with the password ', async () => {
        const login = 'usuario';
        const password = 'senha_valida';
        const sut = makeSut();

        const token = await sut.process(login, password);
        
        expect(token).toEqual('any_token')
    });
    it('it should return a error when no exist informed login', async () => {
        const login = 'usuarioInvalido';
        const password = 'senha';
        const sut = makeSut();

        const token = await sut.process(login, password);
        
        expect(token).toBeInstanceOf(Error)
    });
    it('it should return a error when exist informed login and the password was wrong', async () => {
        const login = 'usuario';
        const password = 'senhaInvalida';
        const sut = makeSut();

        const token = await sut.process(login, password);
        
        expect(token).toBeInstanceOf(Error)
    });
});