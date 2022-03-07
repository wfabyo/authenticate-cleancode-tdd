export class Name {
    public readonly name: string

    private constructor( name: string) {
        this.name = name;
        Object.freeze(this);
    }

    static create (name: string) : Name | Error {
        if(!this.validate(name)) {
            return Error('Invalid Name.')
        }
        return new Name(name);
    }
    
    static validate(name: string) : boolean {
        if(name === '' || name.length < 3 || name.split(' ').length <= 1)
            return false;
        return true;
    }
}