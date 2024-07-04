import type { ChangePass } from "../../types/user";

export interface ChangePassErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export const validateNewPass = (values: ChangePass) => {
  const errors: ChangePassErrors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "La antigua contraseña es requerida";
  }
  if (!values.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida";
  }
  if (values.newPassword === values.oldPassword) {
    errors.newPassword =
      "La nueva contraseña no puede ser la misma que la antigua";
  }
  if (values.newPassword.length < 8) {
    errors.newPassword = "La contraseña debe tener al menos 8 caracteres";
  }
  if (values.newPassword.length > 15) {
    errors.newPassword = "La contraseña no puede tener más de 15 caracteres";
  }
  if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
      values.newPassword
    )
  ) {
    errors.newPassword =
      "La contraseña debe tener una letra mayúscula, una letra minúscula, un número y un carácter especial";
  }
  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Por favor confirme su contraseña";
  }
  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden";
  }
  return errors;
};
