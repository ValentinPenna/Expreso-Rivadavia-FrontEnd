export interface UserRegister {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    dni: string;
    address: string;
    locality: string;
    role: string;
}

export interface CompanyRegister {
    name: string;
    lastName: string;
    companyName: string;
    email: string;
    password: string;
    confirmPassword: string;
    cuit_cuil: string;
    address: string;
    locality: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    name: string;
    lastName: string;
    email: string;
    dni: string;
    address: string;
    locality: string;
    role: string;
}

export interface Company {
    name: string;
    lastName: string;
    companyName: string;
    email: string;
    cuit_cuil: string;
    address: string;
    locality: string;
}

export interface UserSession {
    token: string;
    user: User | Company;
}

export interface LoginResponse {
    token: string;
    userId: string;
}

