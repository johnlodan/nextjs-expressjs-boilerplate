export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginErrorMessage {
    data: {
        message: string;
    }
}
