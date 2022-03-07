import validator from 'validator'

export class Email {
    public readonly email: string

    private constructor( email: string) {
        this.email = email;
        Object.freeze(this);
    }

    static create (email: string) : Email | Error {
        if(!this.validate(email)) {
            return Error('Invalid Email.')
        }
        return new Email(email);
    }
    
    static validate(email: string) : boolean {
        return validator.isEmail(email)
    }
}