import { AuthenticateController } from "../../src/adapters/controllers/AuthenticateController";
import { HttpRequest } from "../../src/adapters/helpers/http-helpers";
import { Authenticate } from "../../src/usecases/ports/Authenticate";

type Sut = {
    sut: AuthenticateController,
    authenticateStub: Authenticate
}

function makeAuthenticate(): Authenticate {
    return {
        process: jest.fn()
    };
}

function makeSut() : Sut {
    const authenticateStub = makeAuthenticate();
    const sut = new AuthenticateController(authenticateStub);
    
    return {sut, authenticateStub};
}

function makeRequest() : HttpRequest {
    const username = 'userTest';
    const password  = 'passTest';
    return {
        body: {
            login: username,
            password: password
        }
    };
}

describe('Authenticate Controller Tests', () => {
    it('Should call process method from usecase and return 200 when the parameters are ok', async () => {
        const request = makeRequest();
                
        const {sut, authenticateStub} = makeSut(); 
        const authenticateSpy = jest.spyOn(authenticateStub, 'process');
        const response = await sut.handle(request);

        expect(authenticateSpy).toHaveBeenCalledWith(request.body.login, request.body.password);
        expect(response.statusCode).toBe(200)
    }),

    it('Should return status code 400 when login is null', async () => {
        const request = makeRequest();
        request.body.login = null;
                
        const {sut} = makeSut(); 
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400); 
    }),

    it('Should return status code 400 when username is invalid', async () => {
        const request = makeRequest();
        request.body.login = 'aaa';
                
        const {sut, authenticateStub} = makeSut(); 
        jest.spyOn(authenticateStub, 'process').mockImplementation(async () => {
            return new Error('Invalid Username.');
        })
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);  
        expect((response.body as Error).message).toBe('Invalid Username.'); 
    }),

    it('Should return status code 400 when Authenticate throws Error', async () => {
        const request = makeRequest();
                
        const {sut, authenticateStub} = makeSut(); 
        jest.spyOn(authenticateStub, 'process').mockImplementation(() => {
            throw new Error();
        });
        const response = await sut.handle(request); 

        expect(response.statusCode).toBe(400);  
        expect((response.body as Error).message).toBe('Internal Error'); 
    })
})