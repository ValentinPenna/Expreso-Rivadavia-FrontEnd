import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";
import { toast } from "react-toastify";
import { useUserStore } from "../store/userStore";
import type { LoginResponse } from "../types/user";
import { generateRandomPassword } from "../helpers/ramdompass";
import validateGoogle from "./validation/validateGoogle";

const RegisterGoogle = () => {
  const [googleInfo, setGoogleInfo] = useState<GoogleInfo>();
  const [registerUser, setRegisterUser] = useState(false);
  const [login, setLogin] = useState(false);
  const userRegister = useUserStore((state: any) => state.userRegister);
  const getUser = useUserStore((state: any) => state.getUser);
  const googleLogin = useUserStore((state: any) => state.googleLogin);
  interface GoogleInfo {
    email: string;
    lastName: string;
    name: string;
  }

  useEffect(() => {
    const infoGoole = localStorage.getItem("infoGoogle");
    if (infoGoole) {
      const userInfo = JSON.parse(infoGoole);
      // console.log(userInfo);
      setGoogleInfo(userInfo);
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          dni: "",
          address: "",
          locality: "",
        }}
        validate={validateGoogle}
        onSubmit={async (values) => {
          // Crear credenciales aleatorias con cierto criterio
          const ramdom = generateRandomPassword();
          const credential = {
            password: ramdom,
            confirmPassword: ramdom,
          };
          const combinedValues = { ...googleInfo, ...values, ...credential };
          // console.log(combinedValues);

          try {
            // Registrar usuario
            const registerSuccess = await userRegister(combinedValues);
            if (registerSuccess) {
              setRegisterUser(true);
              toast.success("Se registró y se inició sesión con Google");
              localStorage.removeItem("infoGoogle");

              // Realizar lógica de inicio de sesión
              const logGoogle: LoginResponse = await googleLogin(
                googleInfo!.email
              );
              // console.log(logGoogle);
              localStorage.setItem("token", logGoogle.token);
              await getUser(logGoogle.userId);
              setLogin(true);
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            } else {
              throw new Error("El registro no fue exitoso");
            }
          } catch (error) {
            console.log(error);
            toast.error("Hubo un error en el registro o inicio de sesión");
          }
        }}
      >
        {({ errors }) => (
          <Form className="w-lg flex flex-col bg-white p-6 items-center rounded-lg shadow-lg my-20">
            <div>
              <h1 className="text-primary text-xl font-bold text-center">
                Completa los siguientes campos
              </h1>
            </div>
            <Input
              label="DNI"
              name="dni"
              placeholder="44444444"
              error={errors.dni}
            />
            <Input
              label="Dirección"
              name="address"
              placeholder="calle 123"
              error={errors.address}
            />
            <Input
              label="Localidad"
              name="locality"
              placeholder="Springfield"
              error={errors.locality}
            />
            <Button type="submit" className="p-0.5 w-fit mt-4">
              Terminar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterGoogle;
