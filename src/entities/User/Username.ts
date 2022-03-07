export class Username {
    public readonly username: string

    private constructor( username: string) {
        this.username = username;
        Object.freeze(this);
    }

    static create (username: string) : Username | Error {
        if(!this.validate(username)) {
            return Error('Invalid Username.')
        }
        return new Username(username);
    }
    
    static validate(username: string) : boolean {
        if(username === '' || username.length < 6 || username.split(' ').length > 1) 
            return false;
        return true;
    }
}