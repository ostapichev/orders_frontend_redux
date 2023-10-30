export interface IPassword {
    confirmPassword?: string;
}

export interface IActivate extends IPassword {

}

export interface IAuth {
    email?: string;
    password?: string;
    confirmPassword?: string;
    token?: string;
}
