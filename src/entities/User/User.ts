import { Email } from "./Email";
import { Name } from "./Name";
import { Password } from "./Password";
import { Username } from "./Username";

export class User {
    public readonly username: Username;
    public readonly email: Email;
    public readonly password: Password;
    public readonly name: Name;

    private constructor(username: Username, password: Password, email: Email, name: Name) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }

    public static create(username: string, password: string, email: string, name: string) {
        const createdUser: Username | Error = Username.create(username);
        const createdPassword: Password | Error = Password.create(password);
        const createdEmail: Email | Error = Email.create(email);
        const createdName: Name | Error = Name.create(name);
        if(createdUser instanceof Error){
            return createdUser
        }

        if(createdPassword instanceof Error){
            return createdPassword
        }

        if(createdEmail instanceof Error){
            return createdEmail
        }

        if(createdName instanceof Error){
            return createdName
        }

        return new User(createdUser, createdPassword, createdEmail, createdName);
    }
}