export interface IRegisterUser {
  email: string;
  dni: string;
  name: string;
  lastName: string;
  address: string;
  locality: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterUserErrors {
  email?: string;
  dni?: string;
  name?: string;
  lastName?: string;
  address?: string;
  locality?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IRegisterCompany {
  email: string;
  cuit_cuil: string;
  companyName: string;
  name: string;
  lastName: string;
  address: string;
  locality: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterCompanyErrors {
  email?: string;
  cuit_cuil?: string;
  companyName?: string;
  name?: string;
  lastName?: string;
  address?: string;
  locality?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IShipment {
  locality_origin: string;
  locality_destination: string;
  size: string;
  address_origin: string;
  address_destination: string;
}
export interface IShipmentErrors {
  address_origin?: string;
  address_destination?: string;
}

export interface googleLogin {
  dni: string;
  address: string;
  locality: string;
}
export interface googleLoginErrors {
  dni?: string;
  address?: string;
  locality?: string;
}
