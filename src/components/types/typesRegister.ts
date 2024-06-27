export interface IRegisterUser {
    email: string,
    dni: string,
    name: string,
    lastName: string,
    address: string,
    locality: string,
    password: string,
    confirmPassword: string,
  }
  
  export interface IRegisterUserErrors {
    email?: string,
    dni?: string,
    name?: string,
    lastName?: string,
    address?: string,
    locality?: string,
    password?: string,
    confirmPassword?: string,
  }

  export interface IRegisterCompany {
    email: string,
    cuit_cuil: string,
    companyName: string,
    name: string,
    lastName: string,
    address: string,
    locality: string,
    password: string,
    confirmPassword: string,
  }

  export interface IRegisterCompanyErrors {
    email?: string,
    cuit_cuil?: string,
    companyName?: string,
    name?: string,
    lastName?: string,
    address?: string,
    locality?: string,
    password?: string,
    confirmPassword?: string,
  }