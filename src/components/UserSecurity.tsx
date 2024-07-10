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
    <section className="w-full text-center my-4 bg-white px-12 py-16 rounded-l-lg flex flex-col max-w-[80%] gap-2">
      <h1 className="font-bold text-4xl text-primary">Seguridad</h1>
      <div className="p-4 flex flex-col items-center rounded-lg max-h-96 overflow-y-auto">
        <h2 className="text-2xl text-primary font-bold mb-4">
          Configuración de Seguridad
        </h2>

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

              changePassword(newValues, user.id)
                .then((res) => {
                  toast.success("El Cambio de contraseña se realizó con éxito");
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
                <Button className="mt-4 p-0.5 text-base w-fit" type="submit">
                  Hacer Cambio
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Historial de Inicios de Sesión */}
        <div className="mb-6">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Historial de Inicios de Sesión
          </h3>
          <ul className="bg-gray-100 p-4 rounded-lg">
            <li className="mb-2">
              Fecha: 2024-06-27, IP: 192.168.1.1, Ubicación: Madrid, España
            </li>
            <li className="mb-2">
              Fecha: 2024-06-25, IP: 192.168.1.2, Ubicación: Barcelona, España
            </li>
            {/* Más entradas */}
          </ul>
        </div>

        {/* Sesiones Activas */}
        <div className="mb-6">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Sesiones Activas
          </h3>
          <ul className="bg-gray-100 p-4 rounded-lg">
            <li className="mb-2">
              Dispositivo: MacBook Pro, Navegador: Chrome, Último acceso:
              2024-06-27
            </li>
            <li className="mb-2">
              Dispositivo: iPhone, Navegador: Safari, Último acceso: 2024-06-25
            </li>
            {/* Más entradas */}
          </ul>
          <Button className="text-white">
            Cerrar sesión en todos los dispositivos
          </Button>
        </div>

        {/* Autorizaciones y Aplicaciones Conectadas */}
        <div className="mb-6">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Aplicaciones Conectadas
          </h3>
          <ul className="bg-gray-100 p-4 rounded-lg">
            <li className="mb-2">
              Aplicación: Google, Último acceso: 2024-06-27{" "}
              <button className="text-red-500 ml-2">Revocar Acceso</button>
            </li>
            <li className="mb-2">
              Aplicación: Facebook, Último acceso: 2024-06-25{" "}
              <button className="text-red-500 ml-2">Revocar Acceso</button>
            </li>
            {/* Más entradas */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserSecurity;
