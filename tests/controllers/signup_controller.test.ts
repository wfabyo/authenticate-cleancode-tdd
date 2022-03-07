import { SignupController } from "../../src/adapters/controllers/SignupController";
import { HttpRequest } from "../../src/adapters/helpers/http-helpers";
import { User } from "../../src/entities/User/User";
import { Signup } from "../../src/usecases/ports/Signup";

type Sut = {
    sut: SignupController,
    signupStub: Signup
}

function makeSignup(): Signup {
    return {
        process: jest.fn()
    };
}

function makeSut() : Sut {
    const signupStub = makeSignup();
    const sut = new SignupController(signupStub);
    
    return {sut, signupStub};
}

function makeRequest():HttpRequest{
    const username = 'userTest';
    const password  = 'passTest';
    const email = 'teste@teste.com';
    const name = 'name last name';
    return {
        body: {
            login: username,
            password: password,
            email: email,
            name: name
        }
    }
}

describe('Signup Controller Tests', () => {
    it('Should call process method from usecase and return 200 when the parameters are ok', async () => {
        const request = makeRequest();
                
        const {sut, signupStub} = makeSut(); 
        const signupSpy = jest.spyOn(signupStub, 'process');
        const response = await sut.handle(request);

        expect(signupSpy).toHaveBeenCalledWith(request.body.login, request.body.password, request.body.email, request.body.name);
        expect(response.statusCode).toBe(200)
    }),

    it('Should return status code 400 when login is null', async () => {
        const request = makeRequest();                
        request.body.login = null;
        const {sut} = makeSut(); 
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400); 
    }),

    it('Should return status code 400 when password is null', async () => {
        const request = makeRequest();
        request.body.password = null;                
        const {sut} = makeSut(); 
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400); 
    }),

    it('Should return status code 400 when email is null', async () => {
        const request = makeRequest();
        request.body.email = null; 
                
        const {sut} = makeSut(); 
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400); 
    }),

    it('Should return status code 400 when name is null', async () => {
        const request = makeRequest();
        request.body.name = null; 
                
        const {sut} = makeSut(); 
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400); 
    }),

    it('Should return status code 400 when Authenticate throws Error', async () => {
        const request = makeRequest();
        
        const {sut, signupStub} = makeSut(); 
        jest.spyOn(signupStub, 'process').mockImplementation(async() => {
            return new Error();
        });
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);  
    }),

    it('Should return status code 400 when Signup throws Error', async () => {
        const request = makeRequest();
                
        const {sut, signupStub} = makeSut(); 
        jest.spyOn(signupStub, 'process').mockImplementation(() => {
            throw new Error('Internal Error');
        });
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);  
        expect((response.body as Error).message).toBe('Internal Error'); 
    })
})