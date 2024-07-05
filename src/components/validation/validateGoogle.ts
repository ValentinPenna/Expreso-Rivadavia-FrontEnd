import type { googleLogin, googleLoginErrors } from "../types/typesRegister";

export default function validateGoogle(values: googleLogin): googleLoginErrors {
  const errors: googleLoginErrors = {};

  if (!values.dni) {
    errors.dni = "Por favor ingrese un número de DNI";
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

  return errors;
}
