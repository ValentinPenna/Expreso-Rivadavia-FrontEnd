interface ILoginError {
  email?: string;
  password?: string;
}
interface ILogin {
  email: string;
  password: string;
}

export const validateLogin = (values: ILogin): ILoginError => {
  const errors: ILoginError = {};
  
  if (!values.email) {
    errors.email = "Por favor ingrese un correo electrónico";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
  ) {
    errors.email =
      "El correo solo puede contener letras, números, puntos, guiones y guion bajo";
  }else if (values.email.length < 50) {
    errors.email = "El correo no puede tener más de 50 caracteres";
  }
   
  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }
  return errors;
};
