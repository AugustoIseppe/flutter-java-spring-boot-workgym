export interface User {
    id: string;
    login: string;
    password: string;
    name: string;
    email: string;
    role: string;
    cpf: string;
}

export interface UserFormData {
    login: string;
    password: string;
    name: string;
    email: string;
    role: string;
    cpf: string;
}

export interface UserFormDataUpdate {
    login: string;
    name: string;
    email: string;
    role: string;
    cpf: string;
}