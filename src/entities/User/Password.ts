export class Password {
    public readonly password: string

    private constructor( password: string) {
        this.password = password;
        Object.freeze(this);
    }

    static create (password: string) : Password | Error {
        if(!this.validate(password)) {
            return Error('Invalid Password.')
        }
        return new Password(password);
    }
    
    static validate(password: string) : boolean {
        //TODO: realizar a validação
        if(password === '' || password.length < 8 || password.split(' ').length > 1)
            return false;
        return true;
    }
}