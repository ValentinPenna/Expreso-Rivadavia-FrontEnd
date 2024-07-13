import type { Orders } from "./shipments";

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
  id: string;
  name: string;
  lastName: string;
  companyName: string;
  email: string;
  dni: string;
  cuit_cuil: string;
  address: string;
  locality: string;
  role: string;
  orders: Orders[];
  profilePicture: string;
  isDeleted: boolean;
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

export interface RegisterResponse {
  id: string;
  name: string;
  lastName: string;
  companyName: string | null;
  email: string;
  dni: string | null;
  cuit_cuil: string | null;
  address: string;
  locality: string;
  role: string;
  profilePicture: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  userId: string;
}

export interface ChangePass {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface ChangePassProps {
  oldPassword: string;
  newPassword: string;
}

export interface UserChangeData {
  email: string;
  name: string;
  lastName: string;
  companyName?: string;
  dni?: string;
  cuit_cuil?: string;
  address: string;
  locality: string;
}
