export class UserRegistrationInfo {
    private login: String;
    private name: String;
    private password: String;

    constructor(login: String, name: String, password: String) {
        this.login = login;
        this.name = name;
        this.password = password;
    }
}

export class UserInfo {
    login?: string;
    name?: string;
}