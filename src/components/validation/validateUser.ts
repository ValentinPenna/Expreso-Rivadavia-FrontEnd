import type {
  IRegisterUser,
  IRegisterUserErrors,
} from "../types/typesRegister";

export default function validateUser(
  values: IRegisterUser
): IRegisterUserErrors {
  const errors: IRegisterUserErrors = {};
  if (!values.email) {
    errors.email = "Por favor ingrese un correo electrónico";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
  ) {
    errors.email =
      "El correo solo puede contener letras, números, puntos y guines";
  } else if (values.email.length > 50) {
    errors.email = "El correo no puede tener más de 50 caracteres";
  }
  if (!values.dni) {
    errors.dni = "Por favor ingrese un número de DNI";
  }
  if (!values.name) {
    errors.name = "Por favor ingrese un nombre";
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }
  if (!values.lastName) {
    errors.lastName = "Por favor ingrese un apellido";
  } else if (!/^[a-zA-Z��-��\s]{1,40}$/.test(values.lastName)) {
    errors.lastName = "El apellido solo puede contener letras y espacios";
  }
  if (!values.address) {
    errors.address = "Por favor ingrese una dirección";
  } else if (values.address.length > 50) {
    errors.address = "El correo no puede tener más de 50 caracteres";
  }
  if (!values.locality) {
    errors.locality = "Por favor ingrese una localidad";
  } else if (values.locality.length > 50) {
    errors.locality = "El correo no puede tener más de 50 caracteres";
  }
  if (!values.password) {
    errors.password = "Por favor ingrese una contraseña";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (values.password.length > 15) {
    errors.password = "La contraseña no puede tener más de 15 caracteres";
  } else if (
    /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&])/.test(values.password)
  ) {
    errors.password =
      "La contraseña debe tener una letra mayuscula, una letra minuscula, un numero y un caracter especial";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Por favor confirme su contraseña";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}
