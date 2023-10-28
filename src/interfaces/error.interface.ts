export interface IErrorGroup {
    name?: string[];
}

export interface IErrorUser {
    email?: string[];
    name?: string[];
    surname?: string[];
    phone?: string[];
}

export interface IErrorOrder extends IErrorUser {
    age?: string[];
    sum?: string[];
    already_paid?: string[];
}

export interface IErrorAuth {
    detail?: string;
}
