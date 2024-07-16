import React, { useState } from "react";
import Button from "./secondary/Button";
import { Form, Formik } from "formik";
import { Input } from "./secondary/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { validateNewPass } from "./validation/validateNewPass";
import { useUserStore } from "../store/userStore";
import { toast } from "react-toastify";

const UserSecurity = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const user = useUserStore((state) => state.user);
  const changePassword = useUserStore((state) => state.changePassword);
  const removeSession = useUserStore((state) => state.removeSession);

  return (
    <section className="w-full text-center my-4 bg-white px-12 pt-16 rounded-l-lg flex flex-col max-w-[80%] gap-2">
      <h1 className="font-bold text-4xl text-primary">Seguridad</h1>
      <div className="p-4 flex flex-col items-center rounded-lg  ">
        {/* Cambio de Contraseña */}
        <div className="mb-6 w-80 flex flex-col justify-center items-center">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Cambio de Contraseña
          </h3>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validate={validateNewPass}
            onSubmit={(values, { resetForm }) => {
              const { confirmNewPassword, ...newValues } = values;
              if (
                window.confirm(
                  "Estas seguro de que quieres cambiar tu contraseña?"
                )
              ) {
                changePassword(newValues, user.id)
                  .then((res) => {
                    toast.success(
                      "El Cambio de contraseña se realizó con éxito"
                    );
                    removeSession();
                    toast.info(
                      "Se va a cerrar sesión, vuelve a loguearte con la nueva contraseña"
                    );
                    setTimeout(() => {
                      window.location.href = "/auth/login";
                    }, 3000);
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Las credenciales están mal");
                  });
              }
            }}
          >
            {({ errors }) => (
              <Form className="flex flex-col justify-center items-center">
                <div className="relative">
                  <Input
                    error={errors.oldPassword}
                    label="Contraseña Actual"
                    name="oldPassword"
                    placeholder="**********"
                    type={oldPasswordVisible ? "text" : "password"}
                  />
                  <div
                    onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                    className="absolute right-0 top-2/3 transform cursor-pointer"
                  >
                    {oldPasswordVisible ? (
                      <AiFillEyeInvisible color="red" />
                    ) : (
                      <AiFillEye color="red" />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Input
                    error={errors.newPassword}
                    label="Nueva contraseña"
                    name="newPassword"
                    placeholder="**********"
                    type={newPasswordVisible ? "text" : "password"}
                  />
                  <div
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    className="absolute right-0 top-2/3 transform cursor-pointer"
                  >
                    {newPasswordVisible ? (
                      <AiFillEyeInvisible color="red" />
                    ) : (
                      <AiFillEye color="red" />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Input
                    error={errors.confirmNewPassword}
                    label="Confirmar contraseña"
                    name="confirmNewPassword"
                    placeholder="**********"
                    type={confirmNewPasswordVisible ? "text" : "password"}
                  />
                  <div
                    onClick={() =>
                      setConfirmNewPasswordVisible(!confirmNewPasswordVisible)
                    }
                    className="absolute right-0 top-2/3 transform cursor-pointer"
                  >
                    {confirmNewPasswordVisible ? (
                      <AiFillEyeInvisible color="red" />
                    ) : (
                      <AiFillEye color="red" />
                    )}
                  </div>
                </div>
                <Button className="mt-4 p-0.5  w-fit" type="submit">
                  Cambiar contraseña
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default UserSecurity;
