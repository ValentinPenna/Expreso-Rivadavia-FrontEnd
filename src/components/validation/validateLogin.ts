interface ILoginError {
  email?: string;
  password?: string;
}
interface ILogin {
  email: string;
  password: string;
}

export const validateLogin = ({ email, password }: ILogin): ILoginError => {
  let error: ILoginError = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    error.email = "El email es requerido";
  } else if (!emailRegex.test(email)) {
    error.email = "El Email no es valido ";
  } else if (!password) {
    error.password = "La contraseña es requerida";
  }
  return error;
};
