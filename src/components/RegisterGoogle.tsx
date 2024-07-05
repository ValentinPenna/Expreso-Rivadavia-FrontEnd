import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";
import type { IRegisterUser } from "./types/typesRegister";
import { toast } from "react-toastify";
import { useUserStore } from "../store/userStore";

const RegisterGoogle = () => {
  const [googleInfo, setGoogleInfo] = useState<GoogleInfo>();
  const [registerUser, setRegisterUser] = useState(false);
  const userRegister = useUserStore((state: any) => state.userRegister);

  interface GoogleInfo {
    email: string;
    lastName: string;
    name: string;
  }

  useEffect(() => {
    const infoGoole = localStorage.getItem("infoGoogle");
    if (infoGoole) {
      const userInfo = JSON.parse(infoGoole);
      console.log(userInfo);
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
        // validate={}

        onSubmit={(values) => {
          // me toca saber como crear una credenciales ramdom con cierto criterio
          const credential = {
            password: "Usuariogoogle1!",
            confirmPassword: "Usuariogoogle1!",
          };
          const combinedValues = { ...googleInfo, ...values, ...credential };
          console.log(combinedValues);

          userRegister(combinedValues)
            .then((data: boolean) => {
              console.log(data);
              if (data) {
                setRegisterUser(true);
                toast.success(
                  "Registro terminado ya puedes iniciar tu sesión con google"
                );

                localStorage.removeItem("infoGoogle");
                setTimeout(() => {
                  window.location.href = "/auth/login";
                }, 3000);
              }
            })
            .catch((error: any) => {
              console.log(error);
            });
        }}
      >
        {({ errors }) => (
          <Form className=" w-lg flex flex-col bg-white p-6 items-center rounded-lg  shadow-lg my-20">
            <div>
              <h1 className="text-primary text-xl font-bold text-center">
                Completa los siguientes campos
              </h1>
            </div>
            <Input
              label="DNI"
              name="dni"
              placeholder="44444444"
              //   error={errors.dni}
            />
            <Input
              label="Dirección"
              name="address"
              placeholder="calle 123"
              //   error={errors.address}
            />
            <Input
              label="Localidad"
              name="locality"
              placeholder="Springfield"
              //   error={errors.locality}
            />
            <Button type="submit" className=" p-0.5 w-fit mt-4">
              Terminar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterGoogle;
