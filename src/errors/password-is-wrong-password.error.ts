export class PasswordIsWrongError extends Error{
    constructor(){
        super("The password is wrong")
    }
}